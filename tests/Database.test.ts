import { Database, DatabaseStore } from "../src";

describe("Database tests", () => {
	test("Database is function", () => {
		expect(typeof Database).toBe("function");
	});

	test("DatabaseStore is function", () => {
		expect(typeof DatabaseStore).toBe("function");
	});
});
