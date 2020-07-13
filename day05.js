let fs = require('fs');
let read = fs.readFileSync("input05.txt");
let data = read.toString().split('\n')
data.pop()

function run(){
    let vowels = /[a,e,i,o,u]/g
    let bad = /ab|cd|pq|xy/g
    let double = /([a-z])\1/g
    let doubleTwo = /([a-z])([a-z])\1/g
    let partTwo = /([a-z][a-z]).*\1/g
    let count = 0
    let count2 = 0

    for(let string of data){

        if(!bad.test(string)){
            let v = string.match(vowels)
            if(v && v.length > 2){
                if(string.match(double)){
                    count++
                }
            }
        }


        if(string.match(doubleTwo)){
            if(string.match(partTwo)){
                count2++
            }
        }
    }

    console.log(`Part one = ${count}`)
    console.log(`Part two = ${count2}`)
}

run()

