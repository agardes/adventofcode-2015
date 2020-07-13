
var fs = require('fs');
var read = fs.readFileSync("input02.txt");
var data = read.toString().split('\n')
data.pop()

let res = []
let res2 = []

const day02 = {
    run: () => {
        for(let size of data){
            let sizes = size.split('x').map(Number)
            let cubic = sizes[0] *  sizes[1] * sizes[2]
            let sorted = sizes.sort((a,b)=> a-b)
            let shortest = sorted[0] * 2 + sorted[1] * 2
            let a = sizes[0] * sizes[1]
            let b = sizes[1] * sizes[2]
            let c = sizes[2] * sizes[0]
            let total = 2*a + 2*b + 2*c
            let toAdd= a <= b && a <= c ? a : b <= a && b <= c ? b : c <= a && c <= b ? c : undefined
            res.push(total+toAdd)
            res2.push(cubic+shortest)
        }
        console.log(`Part one = ${res.reduce( (a,b) => a+b)}`)
        console.log(`Part two = ${res2.reduce( (a,b) => a+b)}`)
    }
}

day02.run()