"use strict";

const {MessageEmbed} = require("discord.js");
// eslint-disable-next-line no-unused-vars
const Interpeter = require("../../Interpeter");
const Variable = require("../Variable");

class EmbedVariable extends Variable {
	/**
	 * @param {Interpeter} interpeter - The interpeter to use
	 */
	constructor(interpeter) {
		super(interpeter, "embed", ["embeds", "lastEmbed", "footerIcon"]);
		this.footer.icon = icon => this.footerIcon(icon);
	}

	get embeds() {
		return this.interpeter.variables.embeds;
	}

	get lastEmbed() {
		return this.embeds.length ? this.embeds[this.embeds.length - 1] : null;
	}

	construct() {
		const {embeds} = this;
		if (embeds.length === 10) throw new Error("Max embeds reached");
		embeds.push(new MessageEmbed());
	}

	color(color) {
		const {lastEmbed} = this;
		this._validate("color");
		lastEmbed.setColor(color);
	}

	title(title) {
		const {lastEmbed} = this;
		this._validate("title");
		lastEmbed.setTitle(title);
	}

	description(description) {
		const {lastEmbed} = this;
		this._validate("description");
		lastEmbed.setDescription(description);
	}

	footer(footer) {
		const {lastEmbed} = this;
		this._validate("footer");
		lastEmbed.setFooter(footer, lastEmbed.footer ? lastEmbed.footer.iconURL : undefined);
	}

	footerIcon(icon) {
		const {lastEmbed} = this;
		this._validate("footer icon");
		if (!lastEmbed.footer) throw new Error("Can't set footer icon before footer text");
		lastEmbed.setFooter(lastEmbed.footer.text, icon);
	}

	/**
	 * @param {string} type - The type to use in the error
	 * @private
	 */
	_validate(type) {
		// Automatically make an embed for you?
		if (!this.lastEmbed) throw new Error(`Can't set ${type} when embed doesn't exist`);
	}
}

module.exports = EmbedVariable;
