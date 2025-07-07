import { handle_error } from "@utils/handle_error";
import { Request, Response } from "express";
import { IUserDocument } from "types/collections";

class WorkoutsRepository {
	async create(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;
			const { title, picture, date, type, duration, shared_to } = req.body;

			const workout = await res.locals.WorkoutsModel.create({
				user: user._id,
				title,
				picture,
				date,
				type,
				duration,
				shared_to,
			});

			// [Notify] - Notify the crews about the member workout

			return res.status(201).json(workout);
		} catch (error) {
			return handle_error(res, error);
		}
	}
}

const WorkoutsRepositoryImpl = new WorkoutsRepository();
export { WorkoutsRepositoryImpl };
