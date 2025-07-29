import { composeWithMongoose } from "graphql-compose-mongoose";
import { WorkoutsModel } from "./workouts.schema";
import { UsersTC } from "@modules/users";
import { IWorkoutDocument } from "types/collections";
import composeWithConnection from "graphql-compose-connection";

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
	workouts: WorkoutsTC.getResolver("findMany")
		.addFilterArg({
			name: "range",
			type: "[Date]",
			description: "Filter workouts by date range",
			query: (rawQuery, value) => {
				if (value && value.length === 2) {
					const [start, end] = value;
					const gte = new Date(start);
					const lte = new Date(end);

					rawQuery.date = {
						$gte: gte.setHours(0, 0, 0, 0),
						$lt: lte.setHours(23, 59, 59, 999),
					};
				}
				return rawQuery;
			},
		})
		.addSortArg({
			name: "DATE_ASC",
			value: { date: 1 },
			description: "Sort workouts by date in ascending order",
		})
		.addSortArg({
			name: "DATE_DESC",
			value: { date: -1 },
			description: "Sort workouts by date in descending order",
		}),
};

const WorkoutMutations = {};

export { WorkoutQueries, WorkoutMutations, WorkoutsTC };
