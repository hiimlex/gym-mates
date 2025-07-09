import { composeWithMongoose } from "graphql-compose-mongoose";
import { JourneyModel } from "./journey.schema";
import { HealthyTC } from "../healthy";
import { IJourneyDocument } from "types/collections";

const JourneyTC = composeWithMongoose(JourneyModel);

const JourneyQueries = {
	journeyById: JourneyTC.getResolver("findById"),
};

const JourneyMutations = {
	updateJourneyById: JourneyTC.getResolver("updateById"),
};

export { JourneyQueries, JourneyMutations, JourneyTC };
