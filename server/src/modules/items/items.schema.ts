import { timestamps } from "@config/schema.config";
import { model, Schema, Types } from "mongoose";
import {
	Collections,
	IAchievementDocument,
	IFigureDocument,
	IItemDocument,
	IItemModel,
	ItemCategory,
	ITitleDocument,
} from "types/collections";

const ItemSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		category: {
			type: String,
			enum: Object.values(ItemCategory),
			required: true,
		},
		price: { type: Number, default: 0, required: true },
		requirements: {
			type: [String],
			default: [],
			required: true,
		},
	},
	{
		timestamps,
		versionKey: false,
		collection: Collections.Items,
		_id: true,
		discriminatorKey: "category",
	}
);

const ItemsModel: IItemModel = model<IItemDocument, IItemModel>(
	Collections.Items,
	ItemSchema,
	Collections.Items
);

const FiguresModel = ItemsModel.discriminator<IFigureDocument>(
	ItemCategory.Figure,
	new Schema(
		{
			src: {
				type: String,
				required: true,
			},
		},
		{
			versionKey: false,
		}
	)
);

const TitlesModel = ItemsModel.discriminator<ITitleDocument>(
	ItemCategory.Title,
	new Schema({
		title: {
			type: String,
			required: true,
		},
	})
);

const AchievementsModel = ItemsModel.discriminator<IAchievementDocument>(
	ItemCategory.Achievement,
	new Schema({
		key: {
			type: String,
			unique: true,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	})
);

export { ItemSchema, ItemsModel, FiguresModel, TitlesModel, AchievementsModel };
