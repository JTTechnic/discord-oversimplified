import { Client } from "../dist";

test("client", () => {
	expect(
		new Client({
			intents: []
		})
	).toBeInstanceOf(Client);
});
