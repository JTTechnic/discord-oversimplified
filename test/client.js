"use strict";

const {token} = require("./auth.json");
const {Client} = require("../src");

// eslint-disable-next-line no-unused-vars
const client = new Client({
	intents: [],
	token
});

const embed = client.environment.get("embed");
client.environment.define("messageoptions", {});
embed();
embed.color("RED");
embed.title("title");
embed.description("description");
embed.footer("footer", "https://example.com/image.png");
embed.footer.icon("https://example.com/image.jpg");
embed.author("author", "https://example.com/image.png", "https://example.com");
embed.author.icon("https://example.com/image.jpg");
embed.author.url("https://example.nl");
embed.field("field", "value");
embed.field("field", "value", true);
embed.fields.add("field", "value", true);
embed.fields.set("field", "value");
embed.image("https://example.com/image.png");
embed.thumbnail("https://example.com/image.png");
embed.url("https://example.com");
embed();
console.log(client.environment.get("messageoptions").embeds);

const setvar = client.environment.get("setvar");
setvar("name", "value");

const getvar = client.environment.get("getvar");
console.log(getvar("name"));

const setUserVar = client.environment.get("setuservar");
setUserVar("name", "value", "131313131313131313", "121212121212121212");

const getUserVar = client.environment.get("getuservar");
console.log(getUserVar("name", "131313131313131313", "121212121212121212"));

const setGlobalUserVar = client.environment.get("setglobaluservar");
setGlobalUserVar("name", "value", "131313131313131313");
