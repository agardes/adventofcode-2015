
var fs = require('fs');
var read = fs.readFileSync("input01.txt");
var data = read.toString().split('')

let floor = 0
let partTwo = false
let res

const day01 = {
    run: () => {
        for(const [i,el] of data.entries()){
            el == '(' ? floor++ : floor--
            floor == -1 && !partTwo ? (partTwo = true, res = i) : undefined
        }
        console.log(`Part one = ${floor}`)
        console.log(`Part two = ${res+1}`)
    },

}

day01.run()