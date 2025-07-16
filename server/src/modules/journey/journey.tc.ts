import { composeWithMongoose } from "graphql-compose-mongoose";
import { JourneyModel } from "./journey.schema";
import { WorkoutsTC } from "@modules/workouts";
import { IJourneyDocument } from "types/collections";
import { schemaComposer } from "graphql-compose";
import { ItemsDTC } from "@modules/items";

const JourneyTC = composeWithMongoose(JourneyModel);

JourneyTC.addRelation("workouts", {
	resolver: () => WorkoutsTC.getResolver("findMany"),
	prepareArgs: {
		filter: (source: IJourneyDocument) => ({ _id: { $in: source.workouts } }),
	},
	projection: { workouts: true }, // Provide the field to be projected
});

JourneyTC.addFields({
	inventory: {
		type: "[InventoryItem!]!",
		resolve: async (source) => {
			const populated = await JourneyModel.populate(source, {
				path: "inventory.item",
			});

			return populated;
		},
	},
});

const InventoryItemTC = schemaComposer.createObjectTC({
	name: "InventoryItem",
	fields: {
		item: ItemsDTC.getType(),
		owned_at: "Date!",
	},
});

JourneyTC.addFields({
	inventory: {
		type: [InventoryItemTC],
	},
});

const JourneyQueries = {
	journeyById: JourneyTC.getResolver("findById"),
};

const JourneyMutations = {
	updateJourneyById: JourneyTC.getResolver("updateById"),
};

export { JourneyMutations, JourneyQueries, JourneyTC };
