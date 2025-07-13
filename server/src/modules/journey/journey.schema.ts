import { timestamps } from "@config/schema.config";
import { model, Schema } from "mongoose";
import {
	Collections,
	IJourneyDocument,
	IJourneyModel,
	JourneyEventAction,
	JourneyEventSchemaType,
} from "types/collections";

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
		data: {
			type: Schema.Types.Mixed,
			required: false,
		},
		created_at: {
			type: Date,
			default: Date.now,
			required: true,
		},
	},
	{ versionKey: false, timestamps }
);

const JourneySchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: Collections.Users,
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
			ref: Collections.Workouts,
			default: [],
			required: false,
		},
		inventory: {
			type: [Schema.Types.ObjectId],
			ref: Collections.Items,
			default: [],
			required: false,
		},
	},
	{ versionKey: false, timestamps, collection: Collections.Journeys }
);

const JourneyModel: IJourneyModel = model<IJourneyDocument, IJourneyModel>(
	Collections.Journeys,
	JourneySchema,
	Collections.Journeys
);

export { JourneySchema, EventSchema, JourneyModel };
