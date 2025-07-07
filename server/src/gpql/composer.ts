import { CrewMutations, CrewQueries } from "@modules/crews";
import { UserMutations, UserQueries } from "@modules/users";
import {
	WorkoutMutations,
	WorkoutQueries,
} from "@modules/workouts/workouts.tc";
import { SchemaComposer } from "graphql-compose";

// Initialize the schema composer
const schemaComposer = new SchemaComposer();

// Add queries and mutations to the schema composer
schemaComposer.Query.addFields({
	...UserQueries,
	...CrewQueries,
	...WorkoutQueries,
});
schemaComposer.Mutation.addFields({
	...UserMutations,
	...CrewMutations,
	...WorkoutMutations,
});

export { schemaComposer };
