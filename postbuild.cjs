// postbuild.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const distPath = path.resolve(__dirname, "dist", "assets");

// Find the main CSS file (usually starts with "index-" and ends with ".css")
const cssFile = fs
  .readdirSync(distPath)
  .find(file => /^index-.*\.css$/.test(file));

if (!cssFile) {
  console.error("❌ Could not find index-*.css in dist/assets");
  process.exit(1);
}

const cssPath = path.join("assets", cssFile);
console.log(`✅ Found CSS file: ${cssPath}`);

const command = `npx critical dist/index.html --inline --base dist --css ${cssPath} --width 375 --height 667 > dist/index.critical.html && npx shx mv dist/index.critical.html dist/index.html`;

try {
  console.log("🚀 Running critical + shx...");
  execSync(command, { stdio: "inherit" });
  console.log("🎉 Critical CSS inlined and index.html updated");
} catch (err) {
  console.error("❌ postbuild failed:", err.message);
  process.exit(1);
}
