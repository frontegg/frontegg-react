import * as path from "path";
import * as fs from "fs";

export default function movePackageJson(opts) {

  return {
    writeBundle: () => {
      const { distFolder, pkg } = opts;
      const { scripts, main, typings, devDependencies, jest, prettier, standard, ...newPkg } = pkg;

      newPkg.main = "./index.js";
      newPkg.typings = "./index.d.ts";

      fs.writeFileSync(path.join(distFolder, "package.json"), JSON.stringify(newPkg, null, 2), { encoding: "utf8" });
    }
  };
}
