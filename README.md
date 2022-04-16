<div align="center">
	<br>
	<p><img width="800" src="https://raw.githubusercontent.com/discordextend/images/main/dos-full.png" alt="Discord Oversimplified Logo"></p>
	<br>
	<a href="https://discord.gg/AQwkmv7kA9"><img src="https://img.shields.io/discord/882085501694246982?color=5865F2&logo=discord&logoColor=white" alt="Discord Server"></a>
	<a href="https://npmjs.com/package/discord-oversimplified"><img src="https://img.shields.io/npm/v/discord-oversimplified.svg?maxAge=3600" alt="NPM Version"></a>
	<a href="https://npmjs.com/package/discord-oversimplified"><img src="https://img.shields.io/npm/dt/discord-oversimplified.svg?maxAge=3600" alt="NPM Downloads"></a>
</div>

## About

A simplified version of discord-extend

## Installation

```sh-session
npm install discord-oversimplified
yarn add discord-oversimplified
pnpm add discord-oversimplified
```

## Example usage

Install the required dependencies:

```sh-session
npm install discord-oversimplified
yarn add discord-oversimplified
pnpm add discord-oversimplified
```

Making a client:

```js
const DOS = require("discord-oversimplified");

// Automatically logs in the client
const client = new DOS.Client({
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

- [Documentation](#) (Not ready yet)
- [Discord-Oversimplified Discord Server](https://discord.gg/AQwkmv7kA9)
- [Discord-Oversimplified GitHub](https://github.com/JTTechnic/discord-oversimplified)
- [NPM](https://npmjs.org/package/discord-oversimplified)

## Contributing

Before you create an issue, please take a look if it has already been reported or suggested, also check the latest [documentation](https://jttechnic.github.io/discordextend/docs).

See [the guide to contributing](https://github.com/JTTechnic/discord-extend/blob/master/.github/CONTRIBUTING.md) to submit a PR.

## Help

If you are having problems with discord-oversimplified, you are welcome to join the [Discord-Extend Server](https://discord.gg/AQwkmv7kA9)
