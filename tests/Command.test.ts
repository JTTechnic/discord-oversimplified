import { Command } from "../src/lib/structures/Command";

describe("Command tests", () => {
	test("Command is function", () => {
		expect(typeof Command).toBe("function");
	});
});
