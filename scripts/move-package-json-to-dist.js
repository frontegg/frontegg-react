const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

function movePackageJson(packagePath) {
  if (packagePath.indexOf("demo-saas") !== -1) {
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(`${packagePath}/package.json`, { encoding: "utf8" }));
  const distFolder = `${packagePath}/dist`;

  const { scripts, main, typings, devDependencies, jest, prettier, standard, ...newPkg } = pkg;
  newPkg.main = "./index.js";
  newPkg.typings = "./index.d.ts";
  if (newPkg.bin) {
    execSync(`tsc --project '${path.join(packagePath, "cli", "tsconfig.json")}' --outDir '${path.join(distFolder, "cli")}'`);
  }
  delete newPkg.dependencies["@frontegg/react"];
  delete newPkg.dependencies["@frontegg/react-core"];
  delete newPkg.dependencies["@frontegg/react-auth"];
  delete newPkg.dependencies["@frontegg/react-elements-semantic"];

  fs.writeFileSync(path.join(distFolder, "package.json"), JSON.stringify(newPkg, null, 2), { encoding: "utf8" });
}

movePackageJson(process.argv[2]);
