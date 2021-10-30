import { Database } from "../dist";

const database = new Database("test");

test("database", () => {
	expect(database).toBeInstanceOf(Database);
});

test("database entry", () => {
	database.set("key", "value");
	expect(database.get("key")).toBe("value");
});
