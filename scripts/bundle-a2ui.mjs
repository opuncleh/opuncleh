import { execSync } from "child_process";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const bundleFile = join(rootDir, "src/canvas-host/a2ui/a2ui.bundle.js");

// If bundle exists, skip (Windows-friendly)
if (existsSync(bundleFile)) {
  console.log("A2UI bundle up to date; skipping.");
  process.exit(0);
}

// On Unix, run the bash script
if (process.platform !== "win32") {
  try {
    execSync("bash scripts/bundle-a2ui.sh", { cwd: rootDir, stdio: "inherit" });
  } catch {
    process.exit(1);
  }
} else {
  console.error("A2UI bundle missing and cannot build on Windows.");
  console.error("Please use a prebuilt release or build on Mac/Linux first.");
  process.exit(1);
}
