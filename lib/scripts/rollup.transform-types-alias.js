import * as path from "path";
import * as fs from "fs";

function walkSync(dir, filelist = null) {
  const files = fs.readdirSync(dir);
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
}

const replaceAliasWithRelativePath = (distFolder, alias) => {
  return (filePath) => {
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    let newFileContent = fileContent;
    Object.keys(alias).forEach(regexStr => {
      let relativePath = path.relative(path.dirname(filePath) + "/", path.join(distFolder, alias[regexStr][0]));
      if (!relativePath.startsWith(".")) {
        relativePath = `./${relativePath}`;
      }
      if (relativePath.endsWith("/*")) {
        relativePath = relativePath.substring(0, relativePath.length - 1);
      }
      newFileContent = newFileContent.replace(new RegExp(regexStr), relativePath);
    });
    if (fileContent !== newFileContent) {
      fs.writeFileSync(filePath, newfileContent, { encoding: "utf-8" });
    }
  };
};


export default function transformTypesAlias(opts) {
  return {
    writeBundle: () => {
      const { distFolder, tsConfig } = opts;
      const files = walkSync(distFolder);
      const alias = tsConfig.compilerOptions.paths;
      files.forEach(replaceAliasWithRelativePath(distFolder, alias));
    }
  };
}
