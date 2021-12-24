import { ColorResolvable, EmbedFieldData, MessageEmbed } from "discord.js";
import { Variable } from "../Variable";

export class EmbedVariable extends Variable {
	public constructor() {
		super(
			"embed",
			Object.assign(
				() => {
					const messageOptions = this.messageOptions;
					messageOptions.embeds ??= [];
					messageOptions.embeds.push(new MessageEmbed());
				},
				{
					color: (color: ColorResolvable) => {
						this.lastEmbed.setColor(color);
					},
					title: (title: string) => {
						this.lastEmbed.setTitle(title);
					},
					description: (description: string) => {
						this.lastEmbed.setDescription(description);
					},
					footer: Object.assign(
						(footer: string, icon = this.lastEmbed.footer?.iconURL) => {
							this.lastEmbed.setFooter(footer, icon);
						},
						{
							icon: (icon: string) => {
								if (!this.lastEmbed.footer) throw new Error("Can't set footer icon before setting footer");
								this.definition.footer(this.lastEmbed.footer.text, icon);
							}
						}
					),
					author: Object.assign(
						(author: string, icon = this.lastEmbed.author?.iconURL, url = this.lastEmbed.author?.url) => {
							this.lastEmbed.setAuthor(author, icon, url);
						},
						{
							icon: (icon: string) => {
								if (!this.lastEmbed.author) throw new Error("Can't set author icon before setting author");
								this.definition.author(this.lastEmbed.author.name, icon);
							},
							url: (url: string) => {
								if (!this.lastEmbed.author) throw new Error("Can't set author url before setting author");
								this.definition.author(this.lastEmbed.author.name, this.lastEmbed.author.iconURL, url);
							}
						}
					),
					field: (name: string, value: string, inline?: boolean) => {
						this.lastEmbed.addField(name, value, inline);
					},
					fields: {
						add: (name: string, value: string, inline?: boolean) => this.definition.field(name, value, inline),
						set: (name: string, value: string, inline?: boolean) => {
							this.lastEmbed.setFields({
								name: name,
								value: value,
								inline: inline
							} as EmbedFieldData);
						}
					},
					image: (url: string) => {
						this.lastEmbed.setImage(url);
					},
					thumbnail: (url: string) => {
						this.lastEmbed.setThumbnail(url);
					},
					timestamp: () => {
						this.lastEmbed.setTimestamp();
					},
					url: (url: string) => {
						this.lastEmbed.setURL(url);
					}
				}
			)
		);
	}

	private get lastEmbed() {
		const messageOptions = this.messageOptions;
		if (!messageOptions.embeds || !messageOptions.embeds.length) {
			throw new Error("Can't set property of embed before making an embed");
		}
		return messageOptions.embeds[messageOptions.embeds.length - 1] as MessageEmbed;
	}
}
