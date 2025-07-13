import { timestamps } from "@config/schema.config";
import { model, Schema, Types } from "mongoose";
import {
	Collections,
	CrewStreak,
	CrewVisibility,
	ICrewDocument,
	ICrewsModel,
} from "types/collections";

const CrewRulesSchema = new Schema(
	{
		gym_focused: { type: Boolean, default: false, required: false },
		pay_on_past: { type: Boolean, default: true, required: false },
		pay_without_picture: { type: Boolean, default: true, required: false },
		show_members_rank: { type: Boolean, default: true, required: false },
		free_weekends: { type: Boolean, default: true, required: false },
	},
	{ versionKey: false, _id: false }
);

const CrewsSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
			unique: true,
		},
		admins: {
			type: [Types.ObjectId],
			ref: Collections.Users,
			required: true,
		},
		members: {
			type: [Types.ObjectId],
			ref: Collections.Users,
			required: true,
		},
		created_by: {
			type: Types.ObjectId,
			ref: Collections.Users,
			required: true,
			unique: true,
		},
		white_list: {
			type: [Types.ObjectId],
			ref: Collections.Users,
			required: false,
		},
		visibility: {
			type: String,
			enum: Object.values(CrewVisibility),
			default: CrewVisibility.Public,
		},
		banner: {
			type: String,
			required: false,
		},
		rules: {
			type: CrewRulesSchema,
			required: false,
			default: {
				gym_focused: false,
				paid_at_anytime: true,
				paid_without_picture: true,
				show_members_rank: true,
				free_weekends: true,
			},
		},
		streak: {
			type: [String],
			enum: Object.values(CrewStreak),
			default: [CrewStreak.Weekly, CrewStreak.Monthly],
		},
		lose_streak_in_days: {
			type: Number,
			default: 2,
			required: false,
		},
	},
	{ versionKey: false, timestamps }
);

CrewsSchema.methods.populate_members = async function () {
	await this.populate({
		path: "members",
		select: "name email avatar coins",
	});
};

const CrewsModel: ICrewsModel = model<ICrewDocument, ICrewsModel>(
	Collections.Crews,
	CrewsSchema,
	Collections.Crews
);

export { CrewRulesSchema, CrewsModel, CrewsSchema };
