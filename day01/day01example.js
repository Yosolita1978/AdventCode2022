const fs = require("fs");

const lines = fs
  .readFileSync("inputday1.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => parseInt(x));


const maxElfData = (array) => {
  let elf = 0;
  let maxElf = 0;
  for (let calories of array) {
    if (!isNaN(calories)) {
      elf += calories;
    } else {
      if (elf > maxElf) {
        maxElf = elf;
      }
      elf = 0;
    }
  }
  return maxElf;

}

const top3Elf = (array) => {
  let elf = 0;
  let tempArray = [];
  for (let i = 0; i < array.length + 1; i++) {
    if (!isNaN(array[i])) {
      elf += array[i];
    } else {
      tempArray.push(elf);
      elf = 0;
    }
  }

  let sortTemp = tempArray.sort((a, b) => b - a)
  let top3 = (sortTemp[0] + sortTemp[1] + sortTemp[2])
  return top3
}
//console.log(lines);
console.log(maxElfData(lines));
console.log(top3Elf(lines));
