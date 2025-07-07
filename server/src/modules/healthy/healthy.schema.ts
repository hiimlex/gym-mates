import { Schema } from "mongoose";
import { Collections } from "types/collections";

const HealthySchema = new Schema(
	{
		weight: {
			type: Number,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
		body_fat: {
			type: Number,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true, collection: Collections.HealthyInfo }
);

export { HealthySchema };
