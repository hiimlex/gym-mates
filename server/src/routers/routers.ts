import {
	AuthController,
	CrewsController,
	WorkoutsController,
} from "../modules";

const auth_controller = new AuthController();
const crews_controller = new CrewsController();
const workouts_controller = new WorkoutsController();

export const routers = [
	auth_controller.router,
	crews_controller.router,
	workouts_controller.router,
];
