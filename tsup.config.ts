import type { Options } from "tsup";

export const tsup: Options = {
	clean: true,
	dts: false,
	entryPoints: ["src/index.ts", "src/lib/structures", "src/lib/databases", "src/lib/variables"],
	format: ["esm", "cjs"],
	minify: true,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: "es2020"
};
