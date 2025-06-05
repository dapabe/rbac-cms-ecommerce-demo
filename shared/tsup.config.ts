import { defineConfig } from "tsup";

export default defineConfig({
	tsconfig: "./tsconfig.json",
	entry: ["./src/**/*.ts"],
	// ignoreWatch: ["node_modules"],
	format: ["esm", "cjs"],
	outDir: "dist",
	sourcemap: true,
	dts: true,
	clean: true,
	splitting: true,
	// treeshake: true,
	skipNodeModulesBundle: true,
	watch: true,
});
