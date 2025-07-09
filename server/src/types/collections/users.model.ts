import { UsersSchema } from "@modules/users";
import { Document, InferSchemaType, Model, Types } from "mongoose";
import { TJourneyEvent } from "./journey.model";

export type TUser = InferSchemaType<typeof UsersSchema>;

export interface IUserDocument extends Document<Types.ObjectId>, TUser {
	add_journey_event: (event: TJourneyEvent) => Promise<void>;
}

export interface IUsersModel extends Model<IUserDocument> {}
