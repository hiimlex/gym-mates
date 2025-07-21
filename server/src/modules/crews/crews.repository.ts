import { HttpException } from "@core/http_exception";
import { UsersModel } from "@modules/users";
import { WorkoutsModel } from "@modules/workouts";
import { handle_error } from "@utils/handle_error";
import { Request, Response } from "express";
import { Types } from "mongoose";
import {
	IUserDocument,
	JourneyEventAction,
	JourneyEventSchemaType,
	TFile,
	TJourneyEvent,
	TUploadedFile,
} from "types/collections";
import { CrewsModel } from "./crews.schema";
import { cloudinaryDestroy } from "@config/cloudinary.config";

class CrewsRepository {
	async create(req: Request, res: Response) {
		try {
			const file = req.file as TUploadedFile;
			const { user } = res.locals;

			let banner: TFile | undefined = undefined;

			if (file) {
				banner = {
					public_id: file.filename,
					url: file.path,
				};
			}

			const { name, visibility, code, rules } = req.body;

			const crew = await CrewsModel.create({
				name,
				visibility,
				code,
				banner,
				rules,
				admins: [user._id],
				members: [user._id],
				white_list: [],
				created_by: user._id,
			});

			// [Journey] - Add a journey event for the crew creation
			const event: TJourneyEvent = {
				_id: new Types.ObjectId(),
				action: JourneyEventAction.JOIN,
				schema: JourneyEventSchemaType.Crew,
				created_at: new Date(),
				data: {
					crew,
				},
			};
			await user.add_journey_event(event);

			return res.status(201).json(crew);
		} catch (error) {
			if (req.file) {
				await cloudinaryDestroy(req.file.path);
			}

			return handle_error(res, error);
		}
	}

	async update_banner(req: Request, res: Response) {
		try {
			const file = req.file as TUploadedFile;
			const { crew_id } = req.body;

			if (!file) {
				throw new HttpException(400, "FILE_NOT_PROVIDED");
			}

			const crew = await CrewsModel.findById(crew_id);

			const is_admin = crew?.admins.some(
				(adm) => adm._id.toString() === res.locals.user._id.toString()
			);

			if (!crew || !is_admin) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			if (crew.banner && crew.banner.public_id) {
				await cloudinaryDestroy(crew.banner.public_id);
			}

			const banner: TFile = {
				public_id: file.filename,
				url: file.path,
			};

			const updated_crew = await CrewsModel.findByIdAndUpdate(
				crew_id,
				{ banner },
				{ new: true }
			);

			return res.status(200).json(updated_crew);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async get_by_code(req: Request, res: Response) {
		try {
			const { code } = req.params;

			const crew = await CrewsModel.findOne({ code });

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			return res.status(200).json(crew);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const crew_id = req.params.id;

			const crew = await CrewsModel.findById(crew_id);

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const is_admin = crew.admins.some(
				(adm) => adm._id.toString() === user._id.toString()
			);

			if (!is_admin) {
				throw new HttpException(403, "FORBIDDEN");
			}

			await crew.deleteOne();

			// [Notify] - Notify the crew members that the crew has been deleted

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async update_config(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const { crew_id } = req.body;

			const crew = await CrewsModel.findById(crew_id);

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const is_admin = crew.admins.some(
				(adm) => adm._id.toString() === user._id.toString()
			);

			if (!is_admin) {
				throw new HttpException(403, "FORBIDDEN");
			}

			const { name, visibility, rules } = req.body;

			const updated_crew = await CrewsModel.findByIdAndUpdate(
				crew_id,
				{
					$set: {
						visibility,
						rules,
					},
				},
				{ new: true }
			);

			return res.status(200).json(updated_crew);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async join(req: Request, res: Response) {
		try {
			const { code } = req.body;
			const { user } = res.locals;

			const crew = await CrewsModel.findOne({ code });

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const is_member = crew.members.includes(user._id);

			if (is_member) {
				throw new HttpException(400, "ALREADY_MEMBER");
			}

			if (crew.visibility === "private") {
				const is_whitelisted =
					crew.white_list && crew.white_list.includes(user._id);

				if (is_whitelisted) {
					throw new HttpException(403, "ALREADY_IN_WHITELIST");
				}

				await crew.updateOne({
					$addToSet: { white_list: user._id },
				});

				return res.status(200).json({
					requested_whitelist: true,
				});
			}

			await crew.updateOne({
				$addToSet: { members: user._id },
			});

			// [Notify] - Notify the crew of new member

			// [Journey] - Add a journey event for the crew join
			const event: TJourneyEvent = {
				_id: new Types.ObjectId(),
				action: JourneyEventAction.JOIN,
				schema: JourneyEventSchemaType.Crew,
				created_at: new Date(),
				data: {
					crew,
				},
			};
			await user.add_journey_event(event);

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async leave(req: Request, res: Response) {
		try {
			const { code } = req.body;
			const { user } = res.locals;

			const crew = await CrewsModel.findOne({ code });

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const is_member = crew.members.includes(user._id);

			if (!is_member) {
				throw new HttpException(400, "USER_NOT_A_MEMBER");
			}

			await crew.updateOne({
				$pull: { members: user._id, admins: user._id },
			});

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async update_admin(req: Request, res: Response) {
		try {
			const { user_id, code, set_admin } = req.body;

			const admin: IUserDocument = res.locals.user;

			const user = await UsersModel.findById(user_id);
			if (!user) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			const crew = await CrewsModel.findOne({
				code,
				admins: admin._id.toString(),
			});

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const user_in_crew = crew.members.some(
				(member) => member._id.toString() === user._id.toString()
			);

			if (!user_in_crew) {
				throw new HttpException(400, "USER_NOT_A_MEMBER");
			}

			if (set_admin) {
				await crew.updateOne({
					$addToSet: { admins: user._id },
				});
			} else {
				await crew.updateOne({
					$pull: { admins: user._id },
				});
			}

			const updatedCrew = await CrewsModel.findById({
				_id: crew._id,
			});

			return res.status(200).json(updatedCrew);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async accept_member(req: Request, res: Response) {
		try {
			const admin: IUserDocument = res.locals.user;
			const { user_id, code } = req.body;

			const new_member_user = await UsersModel.findById(user_id);

			if (!new_member_user) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			const crew = await CrewsModel.findOne({
				code,
				admins: admin._id.toString(),
			});

			if (
				!crew?.admins.some((a) => a._id.toString() === admin._id.toString())
			) {
				throw new HttpException(403, "FORBIDDEN");
			}

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const user_in_white_list =
				crew.white_list &&
				crew.white_list.some(
					(member) => member._id.toString() === new_member_user._id.toString()
				);

			if (!user_in_white_list) {
				throw new HttpException(400, "USER_NOT_IN_WHITELIST");
			}

			await crew.updateOne({
				$pull: { white_list: new_member_user._id },
				$addToSet: { members: new_member_user._id },
			});

			// [Notify] - Notify the user that they have been accepted into the crew

			// [Journey] - Add a journey event for the crew join
			const event: TJourneyEvent = {
				_id: new Types.ObjectId(),
				action: JourneyEventAction.JOIN,
				schema: JourneyEventSchemaType.Crew,
				created_at: new Date(),
				data: {
					crew,
				},
			};
			await new_member_user.add_journey_event(event);

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async reject_member(req: Request, res: Response) {
		try {
			const admin: IUserDocument = res.locals.user;
			const { user_id, code } = req.body;

			const new_member_user = await UsersModel.findById(user_id);

			if (!new_member_user) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			const crew = await CrewsModel.findOne({
				code,
				admins: admin._id.toString(),
			});

			if (
				!crew?.admins.some((a) => a._id.toString() === admin._id.toString())
			) {
				throw new HttpException(403, "FORBIDDEN");
			}

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const user_in_white_list =
				crew.white_list &&
				crew.white_list.some(
					(member) => member._id.toString() === new_member_user._id.toString()
				);

			if (!user_in_white_list) {
				throw new HttpException(400, "USER_NOT_IN_WHITELIST");
			}

			await crew.updateOne({
				$pull: { white_list: new_member_user._id },
			});

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async kick_member(req: Request, res: Response) {
		try {
			const { user_id, code } = req.body;
			const admin: IUserDocument = res.locals.user;

			const user = await UsersModel.findById(user_id);

			if (!user) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			const crew = await CrewsModel.findOne({
				code,
				admins: admin._id.toString(),
			});

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			if (
				!crew?.admins.some((a) => a._id.toString() === admin._id.toString())
			) {
				throw new HttpException(403, "FORBIDDEN");
			}

			const user_in_crew = crew.members.some(
				(member) => member._id.toString() === user._id.toString()
			);

			if (!user_in_crew) {
				throw new HttpException(400, "USER_NOT_A_MEMBER");
			}

			// [Notify] - Notify the user that they have been removed from crew

			await crew.updateOne({
				$pull: { members: user_id },
			});

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async get_rank(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;
			const { crew_id, show_all } = req.body;

			const crew = await CrewsModel.findById(crew_id);

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const is_member = crew.members.some(
				(member) => member._id.toString() === user._id.toString()
			);

			if (!is_member) {
				throw new HttpException(403, "FORBIDDEN");
			}

			const crew_populated = await crew.populate<{ members: IUserDocument[] }>(
				"members"
			);

			const rank = crew_populated.members
				.map((member) => ({
					_id: member._id,
					name: member.name,
					avatar: member.avatar,
					character: member.character,
					coins: member.coins || 0,
				}))
				.sort((a, b) => {
					return a.coins < b.coins ? 1 : -1;
				});

			if (!show_all) {
				const first_three = rank.slice(0, 3);

				return res.status(200).json(first_three);
			}

			return res.status(200).json(rank);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async get_activities(req: Request, res: Response) {
		try {
			const { crew_id } = req.body;
			const { start_date, end_date } = req.query;

			const start_date_obj = start_date
				? new Date(start_date as string)
				: new Date();

			const end_date_obj = end_date ? new Date(end_date as string) : new Date();

			start_date_obj.setHours(0, 0, 0, 0);
			end_date_obj.setHours(23, 59, 59, 999);

			const crew = await CrewsModel.findById(crew_id);
			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const workouts = await WorkoutsModel.find({
				shared_to: crew._id,
				user: { $in: crew.members },
				date: {
					$gte: start_date_obj,
					$lt: end_date_obj,
				},
			});

			return res.status(200).json(workouts);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async get_activities_days(req: Request, res: Response) {
		try {
			const { crew_id } = req.body;
			const { start_date, end_date } = req.query;

			const start_date_obj = start_date
				? new Date(start_date as string)
				: new Date();

			const end_date_obj = end_date ? new Date(end_date as string) : new Date();

			start_date_obj.setHours(0, 0, 0, 0);
			end_date_obj.setHours(23, 59, 59, 999);

			const crew = await CrewsModel.findById(crew_id);
			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const workouts = await WorkoutsModel.aggregate([
				{
					$match: {
						shared_to: crew._id,
						user: { $in: crew.members },
						date: {
							$gte: start_date_obj,
							$lt: end_date_obj,
						},
					},
				},
				{
					$group: {
						_id: {
							year: { $year: "$date" },
							month: { $month: "$date" },
							day: { $dayOfMonth: "$date" },
						},
						count: { $sum: 1 },
					},
				},
				{
					$sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
				},
			]);

			const activities_days = workouts.map((workout) => ({
				date: new Date(
					workout._id.year,
					workout._id.month - 1,
					workout._id.day
				),
				count: workout.count,
			}));

			return res.status(200).json(activities_days);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async favorite(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;
			const { crew_id } = req.body;

			const crew = await CrewsModel.findById(crew_id);

			if (!crew) {
				throw new HttpException(404, "CREW_NOT_FOUND");
			}

			const is_member = crew.members.some(
				(member) => member._id.toString() === user._id.toString()
			);

			if (!is_member) {
				throw new HttpException(403, "FORBIDDEN");
			}

			const is_favorite =
				!!user.favorites &&
				user.favorites.some(
					(fav) => fav._id.toString() === crew._id.toString()
				);

			if (!is_favorite) {
				await user.updateOne({
					$addToSet: { favorites: crew._id },
				});

				return res.sendStatus(204);
			}

			await user.updateOne({
				$pull: { favorites: crew._id },
			});

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}
}

const CrewsRepositoryImpl = new CrewsRepository();

export { CrewsRepositoryImpl };
