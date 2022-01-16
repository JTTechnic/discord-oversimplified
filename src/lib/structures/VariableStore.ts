import { Store } from "@sapphire/framework";
import { Variable } from "./Variable";

export class VariableStore extends Store<Variable> {
	public constructor() {
		super(Variable, { name: "variables" });
	}

	public override async loadAll() {
		await super.loadAll();
		this.forEach((variable) => this.container.environment.define(variable.name, variable.definition));
	}
}
