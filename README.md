<div align="center">
	<br>
	<p><img width="800" src="https://raw.githubusercontent.com/simpledjs/images/main/dos-full.png" alt="Discord Oversimplified Logo"></p>
	<br>
	<a href="https://discord.gg/AQwkmv7kA9"><img src="https://img.shields.io/discord/882085501694246982?color=5865F2&logo=discord&logoColor=white" alt="Discord Server"></a>
	<a href="https://npmjs.com/package/@simpledjs/framework"><img src="https://img.shields.io/npm/v/@simpledjs/framework.svg?maxAge=3600" alt="NPM Version"></a>
	<a href="https://npmjs.com/package/@simpledjs/framework"><img src="https://img.shields.io/npm/dt/@simpledjs/framework.svg?maxAge=3600" alt="NPM Downloads"></a>
</div>

## About

A framework built with discord.js and the sapphire framework to make discord bot development easier

## Installation

```sh-session
npm install @simpledjs/framework
yarn add @simpledjs/framework
pnpm add @simpledjs/framework
```

## Example usage

Install the required dependencies:

```sh-session
npm install @simpledjs/framework
yarn add @simpledjs/framework
pnpm add @simpledjs/framework
```

Making a client:

```js
const SDJS = require("@simpledjs/framework");

// Automatically logs in the client
const client = new SDJS.Client({
	intents: [], // required
	token: "BOT_TOKEN" // required
});
```

Making a command in the same file as the client:

```js
client.command(
	"example",
	`
	content.set("content text");
	embed();
	embed.description("embed");
	reply(true);
`
);
```

Making a command in a seperate directory:

```js
module.exports = {
	trigger: "example",
	code: `
		content.set("content text");
		embed();
		embed.description("embed");
		reply(true);
	`
};
```

## Links

- [Documentation](https://www.notion.so/Discord-Oversimplified-Documentation-8e528936c677448394641d5d4bdbbeac) (temporary docs)
- [simple.djs Discord Server](https://discord.gg/AQwkmv7kA9)
- [simple.djs GitHub](https://github.com/simpledjs/simple.djs)
- [NPM](https://npmjs.org/package/@simpledjs/framework)

## Contributing

Before you create an issue, please take a look if it has already been reported or suggested, also check the latest [documentation](https://www.notion.so/Discord-Oversimplified-Documentation-8e528936c677448394641d5d4bdbbeac).

## Help

If you are having problems with simple.djs, you are welcome to join the [simple.djs Server](https://discord.gg/AQwkmv7kA9)
