import { CrewsSchema } from "@modules/crews";
import { InferSchemaType, Document, Model, Types } from "mongoose";

export enum CrewVisibility {
	Public = "public",
	Private = "private",
}

export enum CrewStreak {
	Weekends = "weekends",
	Weekly = "weekly",
	Monthly = "monthly",
	Yearly = "yearly",
}

export type TCrew = InferSchemaType<typeof CrewsSchema>;

export interface ICrewDocument extends Document<Types.ObjectId>, TCrew {
	created_at: Date;
	updated_at: Date;
	populate_members: () => Promise<void>;
}

export interface ICrewsModel extends Model<ICrewDocument> {}
