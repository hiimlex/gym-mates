import mongoose, { set } from "mongoose";
import { Server } from "../../app";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { create_crew_mock, create_user_mock } from "../../__mocks__";
import { ApiPrefix, Endpoints } from "types/generics";
import { IUserDocument, TUser } from "types/collections/users.model";
import { CrewVisibility, ICrewDocument, TCrew } from "types/collections";
import { test_get_user_and_cookie } from "@test/test.helpers";

const test_server = new Server();
test_server.setup();
const test_agent = request(test_server.app);
let mongo_server: MongoMemoryServer;
let cookie: string;
let created_user: IUserDocument;
let mock_crew: Partial<TCrew>;
let created_crew: ICrewDocument;

beforeAll(async () => {
	if (mongoose.connection.readyState !== 0) {
		await mongoose.disconnect();
	}

	mongo_server = await MongoMemoryServer.create();
	const uri = mongo_server.getUri();
	await mongoose.connect(uri);

	const r = await test_get_user_and_cookie(test_agent);
	cookie = r.cookie;
	created_user = r.user;

	mock_crew = create_crew_mock();
});

afterAll(async () => {
	const collections = mongoose.connection.collections;
	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany();
	}

	await mongoose.disconnect();
	await mongo_server.stop();
});

describe("Crews Module", () => {
	describe(`POST /crews/`, () => {
		it("should create a crew", async () => {
			const { statusCode, body } = await test_agent
				.post(ApiPrefix + Endpoints.CrewsCreate)
				.set("Cookie", cookie)
				.send(mock_crew);
			created_crew = body;
			expect(statusCode).toBe(201);
			expect(body).toHaveProperty("name", mock_crew.name);
			expect(body).toHaveProperty("code", mock_crew.code);
		});
	});

	describe(`GET /crews/get-by-code`, () => {
		it("should get a crew by code", async () => {
			const { statusCode, body } = await test_agent
				.get(
					ApiPrefix +
						Endpoints.CrewsGetByCode.replace(":code", created_crew.code)
				)
				.set("Cookie", cookie);

			expect(statusCode).toBe(200);
			expect(body).toHaveProperty("name", mock_crew.name);
			expect(body).toHaveProperty("code", mock_crew.code);
			expect(body).toHaveProperty("members", [created_user._id.toString()]);
		});
	});

	describe("GET /crews/get-rank", () => {
		it("Should get crew rank", async () => {
			const { statusCode, body } = await test_agent
				.get(ApiPrefix + Endpoints.CrewsGetRank)
				.set("Cookie", cookie)
				.send({ crew_id: created_crew._id.toString() });

			expect(statusCode).toBe(200);
			expect(body).toBeDefined();
		});
	});

	// [ToTest] - GET /crews/activities
	// [ToTest] - Get /crews/activities-days 

	describe(`POST /crews/join`, () => {
		it("should join a member to a crew", async () => {
			const temp = await test_get_user_and_cookie(test_agent);

			expect(temp.user).toHaveProperty("_id");

			const { statusCode } = await test_agent
				.post(ApiPrefix + Endpoints.CrewsJoin)
				.set("Cookie", temp.cookie)
				.send({ code: created_crew.code });

			expect(statusCode).toBe(204);
		});

		it("should join whitelist if crew is private", async () => {
			const mock_new_crew = create_crew_mock({
				visibility: CrewVisibility.Private,
			});

			const new_crew = (
				await test_agent
					.post(ApiPrefix + Endpoints.CrewsCreate)
					.set("Cookie", cookie)
					.send(mock_new_crew)
			).body;

			expect(new_crew).toBeDefined();

			const temp = await test_get_user_and_cookie(test_agent);

			expect(temp.user).toHaveProperty("_id");

			const { statusCode, body } = await test_agent
				.post(ApiPrefix + Endpoints.CrewsJoin)
				.set("Cookie", temp.cookie)
				.send({ code: new_crew.code });

			expect(statusCode).toBe(200);
			expect(body).toHaveProperty("requested_whitelist", true);
		});
	});

	describe("POST /crews/accept-member", () => {
		it("should accept a member to a crew", async () => {
			const mock_new_crew = create_crew_mock({
				visibility: CrewVisibility.Private,
			});

			const temp_crew = (
				await test_agent
					.post(ApiPrefix + Endpoints.CrewsCreate)
					.set("Cookie", cookie)
					.send(mock_new_crew)
			).body;

			expect(temp_crew).toBeDefined();

			const temp = await test_get_user_and_cookie(test_agent);

			expect(temp.user).toHaveProperty("_id");

			await test_agent
				.post(ApiPrefix + Endpoints.CrewsJoin)
				.set("Cookie", temp.cookie)
				.send({ code: temp_crew.code });

			const user_id = temp.user._id.toString();

			const { statusCode } = await test_agent
				.post(ApiPrefix + Endpoints.CrewsAcceptMember)
				.set("Cookie", cookie)
				.send({ user_id, code: temp_crew.code });

			expect(statusCode).toBe(204);
		});
	});

	describe("POST /crews/reject-member", () => {
		it("should reject member from crew whitelist", async () => {
			const mock_new_crew = create_crew_mock({
				visibility: CrewVisibility.Private,
			});

			const temp_crew = (
				await test_agent
					.post(ApiPrefix + Endpoints.CrewsCreate)
					.set("Cookie", cookie)
					.send(mock_new_crew)
			).body;

			expect(temp_crew).toBeDefined();

			const temp = await test_get_user_and_cookie(test_agent);

			expect(temp.user).toHaveProperty("_id");

			await test_agent
				.post(ApiPrefix + Endpoints.CrewsJoin)
				.set("Cookie", temp.cookie)
				.send({ code: temp_crew.code });

			const user_id = temp.user._id.toString();

			const { statusCode } = await test_agent
				.post(ApiPrefix + Endpoints.CrewsRejectMember)
				.set("Cookie", cookie)
				.send({ user_id, code: temp_crew.code });

			expect(statusCode).toBe(204);
		});
	});

	describe("PUT /crews/update-admins/", () => {
		it("should update admin status of a crew member", async () => {
			const temp = await test_get_user_and_cookie(test_agent);

			expect(temp.user).toHaveProperty("_id");

			await test_agent
				.post(ApiPrefix + Endpoints.CrewsJoin)
				.set("Cookie", temp.cookie)
				.send({ code: created_crew.code });

			const temp_user_id = temp.user._id;

			const { statusCode, body } = await test_agent
				.put(ApiPrefix + Endpoints.CrewsUpdateAdmins)
				.set("Cookie", cookie)
				.send({
					user_id: temp_user_id,
					code: created_crew.code,
					set_admin: true,
				});

			expect(body).toHaveProperty("admins");
			expect(body.admins).toContain(temp_user_id.toString());
			expect(statusCode).toBe(200);
		});
	});

	describe(`POST /crews/kick`, () => {
		it("should kick a member from a crew", async () => {
			const temp = await test_get_user_and_cookie(test_agent);

			expect(temp.user).toHaveProperty("_id");

			await test_agent
				.post(ApiPrefix + Endpoints.CrewsJoin)
				.set("Cookie", temp.cookie)
				.send({ code: created_crew.code });

			const temp_user_id = temp.user._id;

			const { statusCode } = await test_agent
				.post(ApiPrefix + Endpoints.CrewsKickMember)
				.set("Cookie", cookie)
				.send({ user_id: temp_user_id, code: created_crew.code });

			expect(statusCode).toBe(204);
		});
	});

	describe(`POST /crews/leave`, () => {
		it("should allow a user to leave a crew", async () => {
			const temp = await test_get_user_and_cookie(test_agent);

			expect(temp.user).toHaveProperty("_id");

			await test_agent
				.post(ApiPrefix + Endpoints.CrewsJoin)
				.set("Cookie", temp.cookie)
				.send({ code: created_crew.code });

			const { statusCode } = await test_agent
				.post(ApiPrefix + Endpoints.CrewsLeave)
				.set("Cookie", temp.cookie)
				.send({ code: created_crew.code });

			expect(statusCode).toBe(204);
		});
	});

	describe("PUT /crews/update-config/", () => {
		it("should update crew configuration", async () => {
			const update_data: Partial<TCrew> = {
				visibility: CrewVisibility.Public,
				rules: {
					free_weekends: false,
				},
			};

			const { body } = await test_agent
				.put(ApiPrefix + Endpoints.CrewsUpdateConfig)
				.set("Cookie", cookie)
				.send({ ...update_data, crew_id: created_crew._id.toString() });

			expect(body).toHaveProperty("visibility", update_data.visibility);
			expect(body.rules).toHaveProperty(
				"free_weekends",
				update_data.rules?.free_weekends
			);
		});
	});

	describe("PUT /crews/favorite", () => {
		it("should add a crew to user's favorites", async () => {
			const { statusCode } = await test_agent
				.put(ApiPrefix + Endpoints.CrewsFavorite)
				.set("Cookie", cookie)
				.send({ crew_id: created_crew._id.toString() });

			const { body: updated_user } = await test_agent
				.get(ApiPrefix + Endpoints.AuthMe)
				.set("Cookie", cookie);

			expect(statusCode).toBe(204);
			expect(updated_user).toHaveProperty("favorites");
			expect(updated_user.favorites).toContain(created_crew._id.toString());
		});
	});

	describe("DELETE /crews/:id", () => {
		it("should delete a crew", async () => {
			const { statusCode } = await test_agent
				.delete(
					ApiPrefix +
						Endpoints.CrewsDelete.replace(":id", created_crew._id.toString())
				)
				.set("Cookie", cookie);

			expect(statusCode).toBe(204);
		});
	});
});
