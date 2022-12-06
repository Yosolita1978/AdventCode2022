const fs = require("fs");

const lines = fs
    .readFileSync("inputexampleday03.txt", { encoding: "utf-8" })
    .split("\n")


console.log(lines);

let lowerCase = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26 }

let upperCase = { A: 27, B: 28, C: 29, D: 30, E: 31, F: 32, G: 33, H: 34, I: 35, J: 36, K: 37, L: 38, M: 39, N: 40, O: 41, P: 42, Q: 43, R: 44, S: 45, T: 46, U: 47, V: 48, W: 49, X: 50, Y: 51, Z: 52 }


function findTotal(input) {
  let total = 0;
  for (let rucksack of input) {
    //console.log(rucksack);
    let priorityRucksack = rucksackPriority(rucksack);
    total += priorityRucksack;
  }
  return total;
}


function rucksackPriority(array) {
  let priority = 0;
  let string = array[0];
  let stringlen = string.length / 2
  let firstHalf = string.slice(0, stringlen);
  let secondHalf = string.slice(stringlen)
  let commonChar = helperCommonChar(firstHalf, secondHalf)
  //console.log(commonChar);
  if (lowerCase.hasOwnProperty(commonChar)) {
    priority = lowerCase[commonChar];
  } else if (upperCase.hasOwnProperty(commonChar)) {
    priority = upperCase[commonChar];
  }

  return priority
}

function helperCommonChar(string1, string2) {
  let duplicate = "";
  for (let i = 0; i < string1.length; i++) {
    if (duplicate.indexOf(string1[i]) === -1) {
      if (string2.indexOf(string1[i]) != -1) {
        duplicate = string1[i];
      }
    }
  }
  return duplicate;
}

function createGroups(array) {
    let groups = [];
    for (let i = 0; i < array.length; i += 3) {
      let temp = [array[i], array[i + 1], array[i + 2]];
      groups.push(temp)
    }
  
    return groups;
  }
  
  function findCommonItem(firstElf, secondElf, thirdElf) {
    let common = "";
    let dictionary = {};
    let firstElfSet = [... new Set(firstElf)];
    let secondElfSet = [... new Set(secondElf)];
    let thirdElfSet = [... new Set(thirdElf)];
    for (letter of firstElfSet) {
      if (!dictionary[letter]) {
        dictionary[letter] = 1
      }
    }
  
    for (letter of secondElfSet) {
      if (dictionary[letter]) {
        dictionary[letter] += 1;
      }
    }
  
    for (letter of thirdElfSet) {
      if (dictionary[letter]) {
        dictionary[letter] += 1;
      }
    }
  
    for (const [key, value] of Object.entries(dictionary)) {
      if (value === 3) {
        common = key
      }
    }
  
    return common
  }
  
  
  function findPriority(letter) {
    let priority = 0;
    if (lowerCase.hasOwnProperty(letter)) {
      priority = lowerCase[letter];
    } else if (upperCase.hasOwnProperty(letter)) {
      priority = upperCase[letter];
    }
  
    return priority
  
  }
  
  function findTotalTwo() {
    let groups = createGroups(lines);
    let total = 0;
    for (let group of groups) {
      const [firstElf, secondElf, thirdElf] = group;
      let common = findCommonItem(firstElf, secondElf, thirdElf);
      let priority = findPriority(common);
      total += priority
    }
    return total;
  }

  console.log(findTotalTwo())
  