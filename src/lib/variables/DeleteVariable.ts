import type { Message } from "discord.js";
import { Variable } from "../Variable";

export class DeleteVariable extends Variable {
	public constructor() {
		super("delete", (message: Message, seconds = 0) => {
			setTimeout(() => void message.delete(), seconds * 1000);
		});
	}
}
