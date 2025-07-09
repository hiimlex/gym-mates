import { composeWithMongoose } from "graphql-compose-mongoose";
import { UsersModel } from "./users.schema";
import { IUserDocument } from "types/collections";
import { JourneyTC } from "@modules/journey";
import { HealthyTC } from "@modules/healthy";

const UsersTC = composeWithMongoose(UsersModel, {
	fields: { remove: ["password", "access_token"] },
});

UsersTC.addRelation("friends", {
	resolver: () => UsersTC.getResolver("findMany"),
	prepareArgs: {
		filter: (source: IUserDocument) => ({
			_id: { $in: (source.friends || []).map((id) => id.toString()) },
		}),
	},
	projection: { friends: true },
});

UsersTC.addRelation("requests", {
	resolver: () => UsersTC.getResolver("findMany"),
	prepareArgs: {
		filter: (source: IUserDocument) => ({
			_id: { $in: (source.requests || []).map((id) => id.toString()) },
		}),
	},
	projection: { requests: true },
});

UsersTC.addRelation("journey", {
	resolver: () => JourneyTC.getResolver("findById"),
	prepareArgs: {
		_id: (source: IUserDocument) => source.journey?.toString(),
	},
	projection: { journey: true },
});

UsersTC.addRelation("healthy", {
	resolver: () => HealthyTC.getResolver("findById"),
	prepareArgs: {
		_id: (source: IUserDocument) => source.healthy?.toString(),
	},
	projection: { healthy: true },
})

const UserQueries = {
	userById: UsersTC.getResolver("findById"),
	userOne: UsersTC.getResolver("findOne"),
	users: UsersTC.getResolver("findMany"),
};

const UserMutations = {
	updateUserById: UsersTC.getResolver("updateById"),
};

export { UserMutations, UserQueries, UsersTC };
