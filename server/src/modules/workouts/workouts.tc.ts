import { composeWithMongoose } from "graphql-compose-mongoose";
import { WorkoutsModel } from "./workouts.schema";
import { UsersTC } from "@modules/users";
import { IWorkoutDocument } from "types/collections";

const WorkoutsTC = composeWithMongoose(WorkoutsModel);

WorkoutsTC.addRelation("user", {
	resolver: () => UsersTC.getResolver("findById"),
	prepareArgs: {
		_id: (source: IWorkoutDocument) => source.user,
	},
	projection: { user: true }, // Provide the field to be projected
});

const WorkoutQueries = {
	workoutById: WorkoutsTC.getResolver("findById"),
	workoutOne: WorkoutsTC.getResolver("findOne"),
	workouts: WorkoutsTC.getResolver("findMany"),
};

const WorkoutMutations = {};

export { WorkoutQueries, WorkoutMutations, WorkoutsTC };
