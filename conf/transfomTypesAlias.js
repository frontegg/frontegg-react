import * as path from "path";
import * as fs from "fs";


var walkSync = function(dir, filelist = null) {
  var files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + "/", filelist);
    } else {
      if (file.endsWith(".d.ts")) {
        filelist.push(dir + file);
      }
    }
  });
  return filelist;
};

const getPathsFromTsConfig = (tsConfigPath) => {
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath));
  return tsConfig.compilerOptions.paths;
};

const replaceAliasWithRelativePath = (rootPath, alias) => {

  return (filePath) => {
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    let newfileContent = fileContent;
    Object.keys(alias).forEach(regexStr => {
      let relativePath = path.relative(path.dirname(filePath) + "/", path.join(process.cwd(), "/dist/cjs/", alias[regexStr][0]));
      if (!relativePath.startsWith(".")) {
        relativePath = `./${relativePath}`;
      }
      if (relativePath.endsWith("/*")) {
        relativePath = relativePath.substring(0, relativePath.length - 1);
      }
      newfileContent = newfileContent.replace(new RegExp(regexStr), relativePath);
    });
    if (fileContent !== newfileContent) {
      fs.writeFileSync(filePath, newfileContent, { encoding: "utf-8" });
    }
  };
};


export default function transformTypesAlias(opts) {

  return {
    writeBundle: () => {
      const files = walkSync(path.join(process.cwd(), "dist/cjs/"));
      const alias = getPathsFromTsConfig(path.join(process.cwd(), "tsconfig.json"));
      files.forEach(replaceAliasWithRelativePath(path.join(process.cwd(), "/dist/cjs/"), alias));
    }
  };
}
