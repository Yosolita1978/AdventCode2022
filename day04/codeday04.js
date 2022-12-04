const fs = require("fs");

const lines = fs
    .readFileSync("inputday04.txt", { encoding: "utf-8" })
    .split("\n")  ///[-:_]/
    .map((team) => team.split(/[-:,]/))

//console.log(lines);

function checkInput(input) {
    let count = 0;
    for (let team of input) {
        if (isFullyContained(team)) {
            count += 1;
        }
    }
    return count;
}

function isFullyContained(team) {
    let firstRange = createRange(parseInt(team[0]), parseInt(team[1]));
    let secondRange = createRange(parseInt(team[2]), parseInt(team[3]));
    let firstRangeContained = checkOneIsContainedInTwo(firstRange, secondRange);
    let secondRangeContained = checkOneIsContainedInTwo(secondRange, firstRange);
    return firstRangeContained || secondRangeContained
}


function createRange(start, end) {
    let result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

function checkOneIsContainedInTwo(array1, array2) {
    for (let number of array1) {
        if (!array2.includes(number)) {
            return false;
        }
    }
    return true;
}

function checkOverlappingInput(input) {
    let count = 0;
    for (let team of input) {
        if (isOverlapping(team)) {
            count += 1;
        }
    }
    return count;
}

function isOverlapping(team) {
    let firstRange = createRange(parseInt(team[0]), parseInt(team[1]));
    let secondRange = createRange(parseInt(team[2]), parseInt(team[3]));
    let firstIsOverlapping = checkOneisOverlappingTwo(firstRange, secondRange);

    return firstIsOverlapping
}

function checkOneisOverlappingTwo(array1, array2) {
    for (let number of array1) {
        if (array2.includes(number)) {
            return true;
        }
    }
    return false;
}

console.log(checkOverlappingInput(lines));

//console.log(checkInput(lines));

