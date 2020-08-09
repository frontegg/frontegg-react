import * as path from "path";
import * as fs from "fs";

var walkSync = function(dir, filelist = null) {
  var files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + "/", filelist);
    } else {
      if (file.indexOf(".generated.tsx") !== -1) {
        filelist.push(dir + file);
      }
    }
  });
  return filelist;
};

export default function loadClassByLibrary(opts) {

  return {
    generateBundle: () => {
      const files = walkSync(path.join(process.cwd(), "src/"));
      const uiLibrary = opts && opts.uiLibrary || "semantic";
      files.forEach(file => {
        const libraryFile = file.replace(".generated.tsx", `.${uiLibrary}.tsx`);
        if (fs.existsSync(libraryFile)) {
          fs.copyFileSync(libraryFile, file);
        } else {
          console.error(`File ${path.basename(libraryFile)} not exists`);
        }
      });
    }
  };
}
