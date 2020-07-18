let fs = require('fs');
let read = fs.readFileSync("input08.txt");
let data = read.toString().split('\n')
data.pop()

let partOne = data.map(el=>el.length - eval(el).length).reduce((a,b) => a+b)
let partTwo = data.map(el=>JSON.stringify(el).length - el.length).reduce((a,b) => a+b)
console.log(`Part one = ${partOne}`)
console.log(`Part two = ${partTwo}`)


