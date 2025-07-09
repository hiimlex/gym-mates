import { Document, InferSchemaType, Model } from "mongoose";
import { EventSchema, JourneySchema } from "@modules/journey";

export enum JourneyEventAction {
	ADD = "add",
	REMOVE = "remove",
	UPDATE = "update",
	BUY = "buy",
	ACHIEVE = "achieve",
	JOIN = "join",
	LEAVE = "leave",
	PAID = "paid",
	START = "start",
}

export enum JourneyEventSchemaType {
	Healthy = "healthy",
	Workout = "workout",
	Item = "item",
	Friend = "friend",
	Crew = "crew",
	User = "user",
}

export type TJourney = InferSchemaType<typeof JourneySchema>;
export type TJourneyEvent = InferSchemaType<typeof EventSchema> & {
	created_at: Date;
};

export interface IJourneyDocument extends TJourney, Document {}


export interface IJourneyModel extends Model<IJourneyDocument> {}
