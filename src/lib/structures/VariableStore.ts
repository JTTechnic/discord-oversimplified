import { Store } from "@sapphire/framework";
import { Variable } from "./Variable";
import { join } from "node:path";
import { Util } from "../Util";

export class VariableStore extends Store<Variable> {
	public constructor() {
		super(Variable, { name: "variables", paths: [join(__dirname, "variables")] });
	}

	public override async load(root: string, path: string) {
		const variables = await super.load(root, path);
		Util.defineVariable(...variables);
		return variables;
	}
}

declare module "@sapphire/framework" {
	interface StoreRegistryEntries {
		variables: VariableStore;
	}
}
