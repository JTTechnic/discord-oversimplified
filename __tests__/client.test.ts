import { token } from "./auth.json";
import { Client } from "../dist";

test("client", () => {
	expect(
		new Client({
			intents: [],
			token
		})
	).toBeInstanceOf(Client);
});
