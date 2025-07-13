import { composeWithMongoose } from "graphql-compose-mongoose";
import { JourneyModel } from "./journey.schema";
import { WorkoutsTC } from "@modules/workouts";
import { IJourneyDocument } from "types/collections";

const JourneyTC = composeWithMongoose(JourneyModel);

JourneyTC.addRelation("workouts", {
	resolver: () => WorkoutsTC.getResolver("findMany"),
	prepareArgs: {
		filter: (source: IJourneyDocument) => ({ _id: { $in: source.workouts } }),
	},
	projection: { workouts: true }, // Provide the field to be projected
});

const JourneyQueries = {
	journeyById: JourneyTC.getResolver("findById"),
};

const JourneyMutations = {
	updateJourneyById: JourneyTC.getResolver("updateById"),
};

export { JourneyMutations, JourneyQueries, JourneyTC };
