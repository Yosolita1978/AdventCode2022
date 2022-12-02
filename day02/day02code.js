const fs = require("fs");

const lines = fs
  .readFileSync("day02example.txt", { encoding: "utf-8" })
  .split("\n")

console.log(lines);