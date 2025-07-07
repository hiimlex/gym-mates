import { composeWithMongoose } from "graphql-compose-mongoose";
import { WorkoutsModel } from "./workouts.schema";

const WorkoutsTC = composeWithMongoose(WorkoutsModel);

const WorkoutQueries = {
	workoutById: WorkoutsTC.getResolver("findById"),
	workoutOne: WorkoutsTC.getResolver("findOne"),
	workouts: WorkoutsTC.getResolver("findMany"),
};

const WorkoutMutations = {
	removeWorkoutById: WorkoutsTC.getResolver("removeById"),
};

export { WorkoutQueries, WorkoutMutations, WorkoutsTC };
