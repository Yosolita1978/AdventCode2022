const fs = require("fs");

const lines = fs
  .readFileSync("day01example.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => parseInt(x));

console.log(lines);