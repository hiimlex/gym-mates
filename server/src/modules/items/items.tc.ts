import {
	composeWithMongoose,
	composeWithMongooseDiscriminators,
} from "graphql-compose-mongoose";
import {
	AchievementsModel,
	FiguresModel,
	ItemsModel,
	TitlesModel,
} from "./items.schema";

const ItemsDTC = composeWithMongooseDiscriminators(ItemsModel);

const TitlesTC = ItemsDTC.discriminator(TitlesModel, {
	fields: {
		remove: ["name"],
	},
});
const AchievementsTC = ItemsDTC.discriminator(AchievementsModel);
const FiguresTC = ItemsDTC.discriminator(FiguresModel);

const ItemsQueries = {
	items: ItemsDTC.getResolver("findMany"),
};

const ItemsMutations = {};

export {
	ItemsQueries,
	ItemsMutations,
	ItemsDTC,
	TitlesTC,
	AchievementsTC,
	FiguresTC,
};
