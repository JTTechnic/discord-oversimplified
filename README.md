## About
A simplified version of discord-extend

## Installation
```sh-session
npm install discord-oversimplified
yarn add discord-oversimplified
pnpm add discord-oversimplified
```

## Example usage
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
client.command("example", "this is an example command");
```

Making a command in a seperate directory:
```js
module.exports = {
	trigger: "example",
	code: "this is an example command"
};
```

## Links
* [Documentation](#) (Not ready yet)
* [Discord-Extend Discord Server](https://discord.gg/AQwkmv7kA9)
* [Discord-Oversimplified GitHub](https://github.com/JTTechnic/discord-oversimplified)
* [NPM](https://npmjs.org/package/discord-oversimplified)

## Contributing
Before you create an issue, please take a look if it has already been reported or suggested, also check the latest [documentation](https://jttechnic.github.io/discordextend/docs).

See [the guide to contributing](https://github.com/JTTechnic/discord-extend/blob/master/.github/CONTRIBUTING.md) to submit a PR.

## Help
If you are having problems with discord-oversimplified, you are welcome to join the [Discord-Extend Server](https://discord.gg/AQwkmv7kA9)
