import { TUser } from "types/collections";
import { faker } from "@faker-js/faker";

export const create_user_mock = (user?: Partial<TUser>): TUser => ({
	name: faker.person.fullName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
	coins: 0,
	created_at: new Date(),
	...user,
});
