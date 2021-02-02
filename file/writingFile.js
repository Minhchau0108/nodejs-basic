const fs = require("fs");
const content = "Please help me writing this sentence to writing.txt\n";
try {
  const data = fs.writeFileSync("test.txt", content);
} catch (e) {
  console.log(e);
}
// Modify the default
const newContent = "Please adding more in the end of test.txt";
fs.writeFileSync("test.txt", newContent, { flag: "a+" }, (e) => {
  console.log(e);
});

// Overwrite the existing content (from the start)
const thirdContent = "Testing with flag w+";
fs.writeFileSync("test.txt", thirdContent, { flag: "w+" }, (e) => {
  console.log(e);
});
