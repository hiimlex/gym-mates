import { composeWithMongoose } from "graphql-compose-mongoose";
import { ICrewDocument } from "types/collections";
import { UsersModel, UsersTC } from "../users";
import { CrewsModel } from "./crews.schema";
import { schemaComposer } from "graphql-compose";

const CrewsTC = composeWithMongoose(CrewsModel);

schemaComposer.createObjectTC({
	name: "MembersWithUser",
	fields: {
		_id: "MongoID!",
		joined_at: "Date",
		is_admin: "Boolean",
		user: UsersTC.getType(), // embedded User
	},
});

CrewsTC.addFields({
	members_w_user: {
		type: "[MembersWithUser]",
		async resolve(source, args, context) {
			const crew = await CrewsModel.findById(source._id);

			const members = crew?.members || [];

			const users = await UsersModel.find({
				_id: { $in: members.map((member) => member.user.toString()) },
			});

			const userMap = Object.fromEntries(
				users.map((u) => [u._id.toString(), u])
			);

			return members.map((m) => ({
				_id: m._id,
				joined_at: m.joined_at,
				is_admin: m.is_admin,
				user: userMap[m.user.toString()] || null,
			}));
		},
	},
});

CrewsTC.addRelation("white_list", {
	resolver: () => UsersTC.getResolver("findMany"),
	prepareArgs: {
		filter: (source: ICrewDocument) => ({
			_id: { $in: (source.white_list || []).map((id) => id.toString) },
		}),
	},
	projection: { white_list: true },
});

const CrewQueries = {
	crews: CrewsTC.getResolver("findMany"),
	crewById: CrewsTC.getResolver("findById"),
	crewOne: CrewsTC.getResolver("findOne"),
};

const CrewMutations = {};

export { CrewMutations, CrewQueries, CrewsTC };
