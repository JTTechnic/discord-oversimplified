import { container } from "@sapphire/framework";
import type { Variable } from "./Variable";

export class Util {
	public static defineVariable(...variables: Variable[]) {
		variables.forEach((variable) => container.environment.define(variable.name, variable.definition));
	}
}
