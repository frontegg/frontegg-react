const express = require("express");
const compression = require("compression");
const path = require("path");
const fs = require("fs");

const app = express();

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(compression({ filter: shouldCompress }));
app.use(express.static("./dist/demo-saas-angular"));
app.get("/*", (req, res) => {
  res.end(fs.readFileSync("./dist/demo-saas-angular/index.html"));
});

app.listen(5000, () => {
  console.log("listen");
});
