// npm install crypto-js
const MD5 = require("crypto-js/md5");

let input = "iwrupvqb"
let foundOne = false
let foundTwo = false
let i = 10000
function partOne(){ 
    while(!foundOne){
        let word = input+i
        let h = MD5(word).toString()
        if(h.substring(0,5) == "00000"){
            foundOne = true
            console.log(`Part one = ${i}`)
        }
    !foundOne ? i++ : undefined  
    }
}

function partTwo(){
    while(!foundTwo){
        let word = input+i
        let h = MD5(word).toString()
        if(h.substring(0,6) == "000000"){
            console.log(`Part two = ${i}`)
            foundTwo = true
        }
     i++   
}
}

partOne()
partTwo()

