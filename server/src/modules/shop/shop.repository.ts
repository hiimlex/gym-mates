import { HttpException } from "@core/http_exception";
import { AchievementsModel, ItemsModel } from "@modules/items";
import { JourneyModel } from "@modules/journey";
import { handle_error } from "@utils/handle_error";
import CatchError from "decorators/catch_error";
import { Request, Response } from "express";
import { Types } from "mongoose";
import {
	IJourneyDocument,
	IUserDocument,
	JourneyEventAction,
	JourneyEventSchemaType,
	TJourneyEvent,
} from "types/collections";

class ShopRepository {
	@CatchError()
	async buy(req: Request, res: Response) {
		const user: IUserDocument = res.locals.user;
		const journey: IJourneyDocument = res.locals.journey;

		const cart = req.body.cart || [];

		if (!cart || !Array.isArray(cart) || cart.length === 0) {
			throw new HttpException(400, "CART_IS_EMPTY");
		}

		const items = await ItemsModel.find({
			_id: { $in: cart },
		});

		// Check if user has none of the items in the cart
		const has_items = items.some((bi) =>
			journey.inventory.some(
				(ji) => ji.item._id.toString() === bi._id.toString()
			)
		);

		if (has_items) {
			throw new HttpException(400, "SOME_ITEMS_ALREADY_OWNED");
		}

		// Check item requirements
		const items_requirements = items.map((item) => item.requirements).flat();

		// If item has requirements, check if the user has them
		if (items_requirements.length > 0) {
			const journey_items = journey.inventory.map((i) => i.item);
			const achievements = await AchievementsModel.find({
				_id: { $in: journey_items },
			});

			const user_achievements = achievements.map(
				(achievement) => achievement.category + ":" + achievement.key
			);

			const user_met_requirements = items_requirements.every((req) =>
				user_achievements.includes(req)
			);

			if (!user_met_requirements) {
				throw new HttpException(400, "USER_NOT_MET_ITEMS_REQUIREMENTS");
			}
		}

		// Check if the user has enough coins
		const total_price = items.reduce((acc, item) => acc + item.price, 0);
		const user_coins = user.coins;
		if (user_coins < total_price) {
			throw new HttpException(400, "USER_DO_NOT_HAVE_ENOUGH_COINS");
		}

		// Deduct coins from user
		user.coins -= total_price;
		await user.save();

		// Add items to user's journey inventory
		const items_to_add = items.map((item) => ({
			item: item._id,
			owned_at: new Date(),
		}));
		journey.inventory.push(...items_to_add);
		await journey.save();

		// Add journey event
		for (const item of items) {
			const event: TJourneyEvent = {
				_id: new Types.ObjectId(),
				action: JourneyEventAction.BUY,
				schema: JourneyEventSchemaType.Item,
				data: {
					item,
				},
				created_at: new Date(),
			};

			await user.add_journey_event(event);
		}

		return res.sendStatus(204);
	}
}

export const ShopRepositoryImpl = new ShopRepository();
