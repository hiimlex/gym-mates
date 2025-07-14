import { composeWithMongoose } from "graphql-compose-mongoose";
import { ItemsModel } from "./items.schema";

const ItemsTC = composeWithMongoose(ItemsModel);

const ItemsQueries = {
	items: ItemsTC.getResolver("findMany"),
};

const ItemsMutations = {};

export { ItemsQueries, ItemsMutations, ItemsTC };
