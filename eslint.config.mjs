import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import { defineConfig } from "eslint/config"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".source/**",
      "build/**",
      "out/**",
      "dist/**",
      "coverage/**",
      "public/**",
      "**/*.d.ts",
      "**/*.config.js",
      "**/*.config.mjs",
    ],
  },
  {
    extends: compat.extends("next/core-web-vitals", "next/typescript"),
  },
])
