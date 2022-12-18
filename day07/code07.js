const fs = require("fs");

const lines = fs
    .readFileSync("inputday07.txt", { encoding: "utf-8" })
    .split("\n")

//console.log(lines);

function readMain(array) {
    let dir = [];
    let sizes = {};
    for (let string of array) {
        if (string.includes("$ cd /")) {
            dir.push('/');
        } else if (string.includes("$ cd ..")) {
            dir.pop();
        } else if (string.includes("$ cd")) {
            dir.push(string.slice(5));
        } else if (!isNaN(string.charAt(0))) {
            const [size, file] = string.split(" ");
            for (let i = 0; i < dir.length; i++) {
                const key = dir.slice(0, i + 1).join("/");
                if (!sizes[key]) {
                    sizes[key] = parseInt(size);
                } else {
                    sizes[key] = sizes[key] + parseInt(size);
                }
            }
        }
    }
    return sizes;
}

function readSizes(object) {
    let ceilling = 100000;
    let result = 0;
    for (let [key, value] of Object.entries(object)) {
        if (value < ceilling) {
            result += value;
        }
    }
    return result;
}

function findDelete(object){
    let totaldisc = 70000000;
    let unusedGoal = 30000000;
    let unusedReal = totaldisc - object["/"]
    let objective = unusedGoal - unusedReal;
    let minimum = null;
    for( let [key, value] of Object.entries(object)){
      if(value >= objective){
        if(minimum === null || minimum > value){
          minimum = value;
        }
      }
    }
    return minimum;
    
  }

let tempSizes = readMain(lines);
//console.log(readSizes(tempSizes));
console.log(findDelete(tempSizes));