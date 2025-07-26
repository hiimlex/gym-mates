import { HttpException } from "@core/http_exception/http_exception";
import {
	AccessTokenCookie,
	COOKIE_MAX_AGE,
	HashSalt,
	JwtExpiresIn,
	JwtSecret,
} from "types/generics";
import { compareSync, hashSync } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { decode, sign } from "jsonwebtoken";
import { UsersModel } from "../users";
import { handle_error } from "@utils/handle_error";
import { JourneyModel } from "@modules/journey";
import {
	IUserDocument,
	JourneyEventAction,
	JourneyEventSchemaType,
	TFile,
	TJourneyEvent,
	TUploadedFile,
} from "types/collections";
import { Types } from "mongoose";
import { cloudinaryDestroy } from "@config/cloudinary.config";

class AuthRepository {
	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const user = await UsersModel.findOne({ email });

			if (!user) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			const is_password_valid = compareSync(password, user.password);

			if (!is_password_valid) {
				throw new HttpException(400, "INVALID_CREDENTIALS");
			}

			const access_token = sign({ id: user._id.toString() }, JwtSecret, {
				expiresIn: JwtExpiresIn,
			});

			await user.updateOne({
				access_token: access_token.toString(),
			});

			return res.status(200).send({
				access_token,
			});
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async sign_up(req: Request, res: Response) {
		try {
			const file = req.file as TUploadedFile;
			const { email, password, name } = req.body;
			let avatar: TFile | undefined = undefined;

			if (file) {
				avatar = {
					public_id: file.filename,
					url: file.originalname,
				};
			}

			const hash_password = hashSync(password, HashSalt);

			const user = await UsersModel.create({
				email,
				password: hash_password,
				name,
				avatar,
			});

			// [Journey] - Create a journey for the user
			const start_event: TJourneyEvent = {
				_id: new Types.ObjectId(),
				action: JourneyEventAction.START,
				schema: JourneyEventSchemaType.User,
				created_at: new Date(),
				data: {
					user: user.toJSON(),
				},
			};

			const user_journey = await JourneyModel.create({
				user: user._id,
				events: [start_event],
				inventory: [],
				healthy: [],
				workouts: [],
			});

			const updated_user = await UsersModel.findByIdAndUpdate(
				user._id,
				{
					journey: user_journey._id,
				},
				{ new: true }
			);

			return res.status(201).json(updated_user);
		} catch (error) {
			if (req.file) {
				await cloudinaryDestroy(req.file.path);
			}

			return handle_error(res, error);
		}
	}

	async me(req: Request, res: Response) {
		try {
			const { user } = res.locals;

			if (!user) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			// [StreakSystem] - Check user streak if the user has lost streak based on crews

			return res.status(200).json(user);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async is_authenticated(req: Request, res: Response, next: NextFunction) {
		try {
			const access_token = req.headers.authorization?.split(" ")[1];

			if (!access_token) {
				throw new HttpException(401, "UNAUTHORIZED");
			}

			const decoded_token = decode(access_token);

			if (!decoded_token) {
				throw new HttpException(401, "UNAUTHORIZED");
			}

			const { id } = decoded_token as { id: string };

			const user = await UsersModel.findById(id);

			if (!user) {
				console.log("User not found for ID:", id);
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			const journey = await JourneyModel.findById(user.journey);
			if (!journey) {
				throw new HttpException(404, "JOURNEY_NOT_FOUND");
			}

			res.locals.user = user;
			res.locals.journey = journey;
			next();
		} catch (error) {
			return handle_error(res, error);
		}
	}
}

const AuthRepositoryImpl = new AuthRepository();

export { AuthRepositoryImpl };
