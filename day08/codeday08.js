const fs = require("fs");

const lines = fs
    .readFileSync("inputday08.txt", { encoding: "utf-8" })
    .split("\n")
    .map((list) => list.split("").map((char) => parseInt(char)))

//console.log(lines);

function createMatrix(matrix) {
    let result = [];
    for (let row of matrix) {
        let tempRow = [];
        for (let number of row) {
            tempRow.push(false);
        }
        result.push(tempRow);
    }
    return result
}

const visible = createMatrix(lines);
//console.log(visible);

function findVisibleFromLeft(matrix, row) {
    let tallest = matrix[row][0];
    visible[row][0] = true;
    for (let i = 1; i < matrix[row].length; i++) {
        if (matrix[row][i] > tallest) {
            visible[row][i] = true;
            tallest = matrix[row][i];
        }
    }
}

function findVisibleFromRight(matrix, row) {
    let tallest = matrix[row][matrix[row].length - 1];
    visible[row][visible[row].length - 1] = true;
    for (let i = matrix[row].length - 1; i >= 0; i--) {
        if (matrix[row][i] > tallest) {
            visible[row][i] = true;
            tallest = matrix[row][i];
        }
    }
}

function findVisibleFromTop(matrix, col) {
    let tallest = matrix[0][col];
    visible[0][col] = true;
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i][col] > tallest) {
            visible[i][col] = true;
            tallest = matrix[i][col];
        }
    }
}

function findVisibleFromBottom(matrix, col) {
    let tallest = matrix[matrix.length - 1][col];
    visible[visible.length - 1][col] = true;
    for (let i = matrix.length - 1; i >= 0; i--) {
        if (matrix[i][col] > tallest) {
            visible[i][col] = true;
            tallest = matrix[i][col];
        }
    }
}

for (let i = 0; i < lines.length; i++) {
    findVisibleFromLeft(lines, i);
    findVisibleFromRight(lines, i);
}

for (let x = 0; x < lines[0].length; x++) {
    findVisibleFromTop(lines, x)
    findVisibleFromBottom(lines, x)
}

function countTrees(matrix) {
    let result = 0;
    for (let row of matrix) {
        for (let space of row) {
            if (space) {
                result += 1;
            }
        }
    }
    return result
}

//console.log(countTrees(visible));

function findScore(matrix) {
    let maxScore = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let x = 0; x < matrix[i].length; x++) {
            //calculate score to the left
            let left = scoreLeft(matrix, i, x);
            //calculate score to the right
            let right = scoreRight(matrix, i, x);
            //calculate score top
            let top = scoreTop(matrix, i, x);
            //calculate score bottom
            let bottom = scoreBottom(matrix, i, x)
            let currentScore = left * right * top * bottom;
            if (currentScore > maxScore) {
                maxScore = currentScore;
            }

        }
    }
    return maxScore;
}

function scoreLeft(matrix, row, col) {
    let current = matrix[row][col];
    let i;
    for (i = col + 1; i < matrix[row].length; i++) {
        if (matrix[row][i] >= current) {
            let score = i - col;
            return score;
        }
    }
    return i - col - 1;
}

function scoreRight(matrix, row, col) {
    let current = matrix[row][col];
    let i;
    for (i = col - 1; i >= 0; i--) {
        if (matrix[row][i] >= current) {
            let score = col - i;
            return score;
        }
    }
    return col - i - 1;
}

function scoreTop(matrix, row, col) {
    let current = matrix[row][col];
    let i;
    for (i = row + 1; i < matrix.length; i++) {
        if (matrix[i][col] >= current) {
            let score = i - row;
            return score;
        }
    }
    return i - row - 1;
}

function scoreBottom(matrix, row, col) {
    let current = matrix[row][col];
    let i;
    for (i = row - 1; i >= 0; i--) {
        if (matrix[i][col] >= current) {
            let score = row - i;
            return score;
        }
    }
    return row - i - 1;
}

console.log(findScore(lines))
