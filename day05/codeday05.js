const fs = require("fs");

const lines = fs
    .readFileSync("inputday05.txt", { encoding: "utf-8" })
    .split("\n") 

//console.log(lines);

function makeInstruction(lines){
    let instructions = [];
    for (let line of lines){
        if(line.startsWith("move")){
            let tempLine = line.split(" ");
            let tempInstruction = {
                move: tempLine[1], 
                from:tempLine[3],
                to:tempLine[5]};
            instructions.push(tempInstruction);
        }
    
    }
    return instructions 
}

function makeStacks(lines){
    let stacks = [];
    let matrix = [];
      for(let line of lines){
          if(line.includes("[")){
            let file = [];
            for(let i=1; i < line.length; i+=4){
              let label = line[i];
              file.push(label);
            }
            matrix.push(file);
          }
        
      }
    let stackamount = matrix[0].length;
    for(let z = 0; z < stackamount; z++){
      let tempStack = [];
      for(let i = 0; i < matrix.length; i++){
        let crate = matrix[i][z];
        if(crate !== " "){
          tempStack.push(crate);
        }
        
      }
      stacks.push(tempStack);  
    }
    return stacks;
  }
  

let instructions = makeInstruction(lines);
let stacks = makeStacks(lines);
//console.log(instructions);
//console.log(stacks);

function allInstructions(stacks, instructions){
    let firstCrates = "";
    for(let instruction of instructions){
      let move = oneInstruction(stacks, instruction)
    }
  
    for(let stack of stacks){
      firstCrates += stack[0];
    }
  
    return firstCrates
  }
  
  function oneInstruction(stacks, instruction){
    let origin = stacks[instruction.from - 1];
    let destination = stacks[instruction.to - 1];
    let howMany = instruction.move;
    let crane = [];
    for(let i=0; i < howMany; i++){
      let element = origin.shift();
      crane.push(element);
      
    }
    destination.unshift(...crane);
    return stacks;
  }
  
console.log(allInstructions(stacks, instructions ));
  