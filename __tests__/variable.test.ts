import { token } from "./auth.json";
import { Client } from "../dist";
import { container } from "@sapphire/framework";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = new Client({
	intents: [],
	token
});

test("variables", () => {
	const { environment } = container;
	expect(environment.get("embed")).not.toBeUndefined();
	expect(environment.get("setvar")).not.toBeUndefined();
	expect(environment.get("getvar")).not.toBeUndefined();
});

test("content", () => {
	const { environment } = container;
	environment.define("messageoptions", {});
	const getContent = () => environment.get("messageoptions").content;

	const content = environment.get("content");
	content.set("content");
	expect(getContent()).toBe("content");
	content.add("morecontent");
	expect(getContent()).toBe("contentmorecontent");
	content.addln("evenmorecontent");
	expect(getContent()).toBe("contentmorecontent\nevenmorecontent");

	environment.set("messageoptions", {});

	content.addln("content");
	expect(getContent()).toBe("content");
});

test("embed", () => {
	const { environment } = container;
	environment.define("messageoptions", {});
	const getOption = (type: string) => {
		return environment.get("messageoptions").embeds[0][type];
	};
	const url = "https://example.com";

	const embed = environment.get("embed");
	embed();
	expect(environment.get("messageoptions").embeds.length).toBe(1);
	embed.color(0);
	expect(getOption("color")).toBe(0);
	embed.title("title");
	expect(getOption("title")).toBe("title");
	embed.description("description");
	expect(getOption("description")).toBe("description");
	embed.footer("footer");
	expect(getOption("footer").text).toBe("footer");
	expect(getOption("footer").iconURL).toBeUndefined();
	embed.footer("footer2", url);
	expect(getOption("footer").text).toBe("footer2");
	expect(getOption("footer").iconURL).toBe(url);
	embed.footer.icon(url);
	expect(getOption("footer").iconURL).toBe(url);
	embed.author("author");
	expect(getOption("author").name).toBe("author");
	embed.author.icon(url);
	expect(getOption("author").iconURL).toBe(url);
	embed.author.url(url);
	expect(getOption("author").url).toBe(url);
	embed.field("name", "value");
	expect(getOption("fields").length).toBe(1);
	embed.fields.set("name", "value");
	expect(getOption("fields").length).toBe(1);
	embed.fields.add("name", "value", true);
	expect(getOption("fields")[1]).toStrictEqual({
		name: "name",
		value: "value",
		inline: true
	});
	embed.image(url);
	expect(getOption("image").url).toBe(url);
	embed.thumbnail(url);
	expect(getOption("thumbnail").url).toBe(url);
	expect(getOption("timestamp")).toBeNull();
	embed.timestamp();
	expect(getOption("timestamp")).not.toBeNull();
	embed.url(url);
	expect(getOption("url")).toBe(url);
});

test("set variable", () => {
	const { environment } = container;
	let setvar = environment.get("setvar");
	setvar("a", 1);
	setvar = environment.get("setuservar");
	setvar("a", 1, "131313", "121212");
	setvar = environment.get("setglobaluservar");
	setvar("a", 1, "131313");
});
