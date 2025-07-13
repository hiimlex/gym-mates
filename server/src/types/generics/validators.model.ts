import Joi from "joi";
import { CrewVisibility, WorkoutType } from "types/collections";

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

const CreateCrew = Joi.object({
	name: Joi.string().required(),
	visibility: Joi.string()
		.valid(...Object.values(CrewVisibility))
		.required(),
	code: Joi.string().trim().required(),
	banner: Joi.string().optional(),
	rules: Joi.object({
		gym_focused: Joi.boolean().optional(),
		pay_on_past: Joi.boolean().optional(),
		pay_without_picture: Joi.boolean().optional(),
		show_members_rank: Joi.boolean().optional(),
		free_weekends: Joi.boolean().optional(),
	}).optional(),
});

export const ValidateBody = {
	CreateWorkout,
	CreateCrew,
};
