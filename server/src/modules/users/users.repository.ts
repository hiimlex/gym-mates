import { HttpException } from "@core/http_exception";
import { HealthyModel } from "@modules/healthy";
import { handle_error } from "@utils/handle_error";
import { Request, Response } from "express";
import { Types } from "mongoose";
import {
	IJourneyDocument,
	IUserDocument,
	JourneyEventAction,
	JourneyEventSchemaType,
	TJourneyEvent,
	TUploadedFile,
} from "types/collections";
import { UsersModel } from "./users.schema";
import { TitlesModel } from "@modules/items";
import { JourneyModel } from "@modules/journey";

class UsersRepository {
	async send_friend_request(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const { friend_id } = req.body;

			const friend = await UsersModel.findById(friend_id);

			if (!friend) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			const already_friends = user.friends?.includes(friend_id);

			if (already_friends) {
				throw new HttpException(400, "ALREADY_FRIENDS");
			}

			await friend.updateOne({
				$addToSet: { requests: user._id },
			});

			// [Notify] - Notify the friend about the new friend request

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async accept_friend_request(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const { friend_id } = req.body;

			const friend = await UsersModel.findById(friend_id);

			if (!friend) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			await user.updateOne({
				$pull: { requests: friend._id },
				$addToSet: { friends: friend._id },
			});

			await friend.updateOne({
				$pull: { requests: user._id },
				$addToSet: { friends: user._id },
			});

			// [Notify] - Notify the friend about the accepted request

			// [Journey] - Add a new event to the user's journey
			const event: TJourneyEvent = {
				_id: new Types.ObjectId(),
				action: JourneyEventAction.ADD,
				schema: JourneyEventSchemaType.Friend,
				data: {
					friend,
				},
				created_at: new Date(),
			};
			await user.add_journey_event(event);

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async reject_friend_request(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const { friend_id } = req.body;

			const friend = await UsersModel.findById(friend_id);

			if (!friend) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			await user.updateOne({
				$pull: { requests: friend_id },
			});

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async remove_friend(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const { friend_id } = req.body;

			const friend = await UsersModel.findById(friend_id);

			if (!friend) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			await friend.updateOne({
				$pull: { friends: user._id, requests: user._id },
			});

			await user.updateOne({
				$pull: { friends: friend._id, requests: friend._id },
			});

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async create_healthy(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const { weight, height, body_fat } = req.body;

			const healthy_info = await HealthyModel.create({
				weight,
				height,
				body_fat,
				user: user._id,
			});

			await user.updateOne({
				$set: { healthy: healthy_info._id },
			});

			// [Journey] - Add a new event to the user's journey
			const event: TJourneyEvent = {
				_id: new Types.ObjectId(),
				action: JourneyEventAction.ADD,
				schema: JourneyEventSchemaType.Healthy,
				data: {
					healthy_info,
				},
				created_at: new Date(),
			};
			await user.add_journey_event(event);

			return res.status(200).json(healthy_info);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async select_title(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;
			const journey: IJourneyDocument = res.locals.journey;

			const { title_id } = req.body;

			const title = await TitlesModel.findById(title_id);

			if (!title || !title_id) {
				throw new HttpException(404, "TITLE_NOT_FOUND");
			}

			if (
				!journey.inventory.some((item) => item.item.toString() === title_id)
			) {
				throw new HttpException(400, "USER_DOES_NOT_OWN_ITEM");
			}

			await user.updateOne({
				$set: { title: title._id },
			});

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async update_avatar(req: Request, res: Response) {
		try {
			const file = req.file as TUploadedFile;
			const user: IUserDocument = res.locals.user;

			if (!user) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			const updated_user = await UsersModel.findByIdAndUpdate(
				user._id,
				{
					avatar: {
						public_id: file.filename,
						url: file.path,
					},
				},
				{ new: true }
			);

			return res.status(200).json(updated_user);
		} catch (error) {
			return handle_error(res, error);
		}
	}
}

export const UsersRepositoryImpl = new UsersRepository();
