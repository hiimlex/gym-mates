import { timestamps } from "@config/schema.config";
import { Schema } from "mongoose";
import { JourneyEventAction, JourneyEventSchemaType } from "types/collections";

const EventSchema = new Schema(
	{
		action: {
			type: String,
			required: true,
			enum: Object.values(JourneyEventAction),
		},
		schema: {
			type: String,
			required: true,
			enum: Object.values(JourneyEventSchemaType),
		},
		ref: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		data: {
			type: Schema.Types.Mixed,
			required: false,
		},
	},
	{ versionKey: false, timestamps }
);

const JourneySchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		events: {
			type: [EventSchema],
			required: false,
			default: [],
		},
		workouts: {
			type: [Schema.Types.ObjectId],
			ref: "Workout",
			default: [],
			required: false,
		},
		inventory: {
			type: [Schema.Types.ObjectId],
			ref: "Items",
			default: [],
			required: false,
		},
		healthy: {
			type: [Schema.Types.ObjectId],
			ref: "Healthy",
			required: false,
		},
	},
	{ versionKey: false, timestamps }
);

export { JourneySchema };
