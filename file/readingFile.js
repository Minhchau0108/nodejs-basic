const fs = require("fs");
// Reading file test.txt
try {
  const data = fs.readFileSync("test.txt", "utf8");
  console.log(data);
} catch (e) {
  console.log(e);
}

//Check folder exist
const args = process.argv.slice(2);
const projectFolder = args[0];
if (!fs.existsSync(projectFolder)) {
  console.log("creating blog folder inside");
  fs.mkdirSync(projectFolder);
}
// Read the content of directory
const contentFolder = fs.readdirSync(projectFolder, "utf-8");
console.log("content folder " + projectFolder);
console.log("content inside", contentFolder);

//Cd inside projectFolder
process.chdir(projectFolder);

// Create folder blog1 inside projectFolder
fs.mkdirSync("blog1");
fs.mkdirSync("blog1/testing");
// Create file index.js inside projectFolder
const contentIndex = `Writing this line into file;`;
fs.writeFileSync("text.txt", contentIndex);

// Delete folder blog and pass an optional {recursive: true}
fs.rmdirSync("blog1", { recursive: true });
