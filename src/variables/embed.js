"use strict";

const {MessageEmbed} = require("discord.js");
const Variable = require("../Variable");

module.exports = class EmbedVariable extends Variable {
	constructor(client) {
		super(client, "embed");

		const embed = () => {
			const messageOptions = this.messageOptions;
			messageOptions.embeds ??= [];
			messageOptions.embeds.push(new MessageEmbed());
			this.messageOptions = messageOptions;
		};

		/**
		 * @param {ColorResolvable} color - The new embed color
		 */
		embed.color = color => {
			this.lastEmbed.setColor(color);
		};

		/**
		 * @param {string} title - The new embed title
		 */
		embed.title = title => {
			this.lastEmbed.setTitle(title);
		};

		/**
		 * @param {string} description - The new embed description
		 */
		embed.description = description => {
			this.lastEmbed.setDescription(description);
		};

		/**
		 * @param {string} footer - The new embed footer text
		 * @param {string} icon - The new embed footer icon
		 */
		embed.footer = (footer, icon = this.lastEmbed.footer?.iconURL) => {
			this.lastEmbed.setFooter(footer, icon);
		};

		/**
		 * @param {string} icon - The new embed footer icon
		 */
		embed.footer.icon = icon => {
			if (!this.lastEmbed.footer) throw new Error("Can't set footer icon before setting footer");
			embed.footer(this.lastEmbed.footer.text, icon);
		};

		/**
		 * @param {string} author - The new embed author
		 * @param {string} icon - The new embed author icon
		 * @param {string} url - The new embed author url
		 */
		embed.author = (author, icon = this.lastEmbed.author?.iconURL, url = this.lastEmbed.author?.url) => {
			this.lastEmbed.setAuthor(author, icon, url);
		};

		/**
		 * @param {string} icon - The new embed author icon
		 */
		embed.author.icon = icon => {
			embed.author(this.lastEmbed.author?.name, icon, this.lastEmbed.author?.url);
		};

		/**
		 * @param {string} url - The new embed author url
		 */
		embed.author.url = url => {
			embed.author(this.lastEmbed.author?.name, this.lastEmbed.author?.iconURL, url);
		};

		/**
		 * @param {string} name - The name of the new embed field
		 * @param {string} value - The value of the new embed field
		 * @param {boolean} [inline] - Wether the new embed field is inline
		 */
		embed.field = (name, value, inline) => {
			this.lastEmbed.addField(name, value, inline);
		};

		embed.fields = {
			add: embed.field,
			/**
			 * @param {string} name - The name of the embed field
			 * @param {string} value - The value of the embed field
			 * @param {boolean} [inline] - Wether the embed field is inline
			 */
			set: (name, value, inline) => {
				this.lastEmbed.setFields([{name, value, inline}]);
			}
		};

		embed.image = url => {
			this.lastEmbed.setImage(url);
		};

		embed.thumbnail = thumbnail => {
			this.lastEmbed.setThumbnail(thumbnail);
		};

		embed.timestamp = () => {
			this.lastEmbed.setTimestamp();
		};

		embed.url = url => {
			this.lastEmbed.setURL(url);
		};

		this.setDefinition(embed);
	}

	/** @type {MessageEmbed} */
	get lastEmbed() {
		this._validateEmbeds();
		return this.messageOptions.embeds[this.messageOptions.embeds.length - 1];
	}

	_validateEmbeds() {
		const messageOptions = this.messageOptions;
		if (!messageOptions.embeds || !messageOptions.embeds.length) {
			throw new Error("Can't set color of embed before making an embed");
		}
	}
};
