import { handle_error } from "@utils/handle_error";
import { Request, Response } from "express";
import {
	IUserDocument,
	JourneyEventAction,
	JourneyEventSchemaType,
	TJourneyEvent,
} from "types/collections";

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

			// [Journey] - Add a journey event for the user
			const event: TJourneyEvent = {
				action: JourneyEventAction.PAID,
				created_at: new Date(),
				schema: JourneyEventSchemaType.Workout,
				data: {
					workout,
				},
			};
			await user.add_journey_event(event);

			return res.status(201).json(workout);
		} catch (error) {
			return handle_error(res, error);
		}
	}
}

const WorkoutsRepositoryImpl = new WorkoutsRepository();
export { WorkoutsRepositoryImpl };
