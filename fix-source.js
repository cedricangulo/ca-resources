const fs = require("fs")
const path = require("path")

const sourcePath = path.join(__dirname, ".source", "index.ts")

if (!fs.existsSync(sourcePath)) {
  console.log("No .source/index.ts found, skipping fix")
  process.exit(0)
}

let content = fs.readFileSync(sourcePath, "utf8")

// Fix the import path for _runtime
const oldImport = 'import { _runtime } from "fumadocs-mdx"'
const newImport = 'import { _runtime } from "fumadocs-mdx/runtime/next"'

if (content.includes(oldImport)) {
  content = content.replace(oldImport, newImport)
  fs.writeFileSync(sourcePath, content)
  console.log("✓ Fixed .source/index.ts import path")
} else if (content.includes(newImport)) {
  console.log("✓ .source/index.ts import path already correct")
} else {
  console.log("⚠ Could not find _runtime import in .source/index.ts")
}
