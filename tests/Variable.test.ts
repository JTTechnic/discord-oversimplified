import { Variable, VariableStore } from "../src";

describe("Variable tests", () => {
	test("Variable is function", () => {
		expect(typeof Variable).toBe("function");
	});

	test("VariableStore is function", () => {
		expect(typeof VariableStore).toBe("function");
	});
});
