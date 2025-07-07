import { composeWithMongoose } from "graphql-compose-mongoose";
import { UsersModel } from "./users.schema";

const UsersTC = composeWithMongoose(UsersModel, {
	fields: { remove: ["password", "access_token"] },
});

const UserQueries = {
	userById: UsersTC.getResolver("findById"),
	userOne: UsersTC.getResolver("findOne"),
	users: UsersTC.getResolver("findMany"),
};

const UserMutations = {
	updateUserById: UsersTC.getResolver("updateById"),
};

export { UserMutations, UserQueries, UsersTC };
