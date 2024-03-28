import esbuild from "esbuild"

const defaultConfig = {
  entryPoints: ["src/ffapl.js"],
  bundle: true,
  external: ["@lezer", "@codemirror"]
}

console.log("Generate CommonJS dist/index.cjs ...")
await esbuild.build({
  ...defaultConfig,
  outfile: "dist/index.cjs",
  format: "cjs",
})

console.log("Generate ES Module dist/index.mjs ...")
await esbuild.build({
  ...defaultConfig,
  outfile: "dist/index.mjs",
  format: "esm",
})

console.log("⚡Done! ⚡")
