import { BaseController } from "@core/base_controller";
import { AuthRepositoryImpl } from "@modules/auth";
import { Endpoints } from "types/generics";
import { UsersRepositoryImpl } from "./users.repository";

export class UsersController extends BaseController {
	constructor() {
		super();
	}

	define_routes(): void {
		this.router.post(
			Endpoints.UsersAcceptFriendRequest,
			AuthRepositoryImpl.is_authenticated,
			UsersRepositoryImpl.accept_friend_request
		);

		this.router.post(
			Endpoints.UsersSendFriendRequest,
			AuthRepositoryImpl.is_authenticated,
			UsersRepositoryImpl.send_friend_request
		);

		this.router.post(
			Endpoints.UsersRemoveFriend,
			AuthRepositoryImpl.is_authenticated,
			UsersRepositoryImpl.remove_friend
		);

		this.router.post(
			Endpoints.UsersRejectFriendRequest,
			AuthRepositoryImpl.is_authenticated,
			UsersRepositoryImpl.reject_friend_request
		);

		this.router.post(
			Endpoints.UsersCreateHealthy,
			AuthRepositoryImpl.is_authenticated,
			UsersRepositoryImpl.create_healthy
		)
	}
}
