const fs = require("fs");
const path = require("path");


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


const files = walkSync(path.join(process.cwd(), "src/"));
uiLibrary = process.env.UI_LIBRARY || "semantic";
files.forEach(file => {
  const libraryFile = file.replace(".generated.tsx", `.${uiLibrary}.tsx`);
  fs.copyFileSync(libraryFile, file,)
});
console.log("aa");
