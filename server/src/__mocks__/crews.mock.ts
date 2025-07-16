import { faker } from "@faker-js/faker";
import { CrewStreak, CrewVisibility, TCrew } from "types/collections";

export const create_crew_mock = (crew?: Partial<TCrew>): Partial<TCrew> => ({
	name: faker.company.name(),
	code: faker.string.alphanumeric(6).toUpperCase(),
	visibility: CrewVisibility.Public,
	banner: faker.image.url(),
	rules: {
		gym_focused: false,
		pay_on_past: true,
		pay_without_picture: true,
		show_members_rank: true,
		free_weekends: true,
	},
	streak: [CrewStreak.Weekly],
	...crew,
});
