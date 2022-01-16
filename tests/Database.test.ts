import { Database } from "../src";

describe("Database tests", () => {
	test("database", () => {
		expect(typeof Database).toBe("function");
	});
});
