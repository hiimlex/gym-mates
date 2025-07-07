import { handle_error } from "@utils/handle_error";
import { Request, Response } from "express";
import { IUserDocument } from "types/collections";
import { UsersModel } from "./users.schema";
import { HttpException } from "@core/http_exception";

class UsersRepository {
	async send_friend_request(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const { friend_id } = req.body;

			const friend = await UsersModel.findById(friend_id);

			if (!friend) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			const already_friends = user.friends?.includes(friend_id);

			if (already_friends) {
				throw new HttpException(400, "ALREADY_FRIENDS");
			}

			await friend.updateOne({
				$addToSet: { requests: friend_id },
			});

			// [Notify] - Notify the friend about the new friend request

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async accept_friend_request(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const { friend_id } = req.body;

			const friend = await UsersModel.findById(friend_id);

			if (!friend) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			await user.updateOne({
				$pull: { requests: user._id },
				$addToSet: { friends: user._id },
			});

			await friend.updateOne({
				$pull: { requests: user._id },
				$addToSet: { friends: user._id },
			});

			// [Notify] - Notify the friend about the accepted request

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}

	async remove_friend(req: Request, res: Response) {
		try {
			const user: IUserDocument = res.locals.user;

			const { friend_id } = req.body;

			const friend = await UsersModel.findById(friend_id);

			if (!friend) {
				throw new HttpException(404, "USER_NOT_FOUND");
			}

			await friend.updateOne({
				$pull: { friends: user._id, requests: user._id },
			});

			await user.updateOne({
				$pull: { friends: friend._id, requests: friend._id },
			});

			return res.sendStatus(204);
		} catch (error) {
			return handle_error(res, error);
		}
	}
}

export const UsersRepositoryImpl = new UsersRepository();
