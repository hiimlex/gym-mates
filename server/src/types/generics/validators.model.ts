import Joi from "joi";
import { WorkoutType } from "types/collections";

const CreateWorkout = Joi.object({
	title: Joi.string().required(),
	picture: Joi.string().optional(),
	date: Joi.date().required(),
	type: Joi.string()
		.valid(...Object.values(WorkoutType))
		.required(),
	shared_to: Joi.array().items(Joi.string()).required(),
	duration: Joi.number().required(),
});

export const ValidateBody = {
	CreateWorkout,
};
