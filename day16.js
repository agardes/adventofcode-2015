let fs = require('fs');
let read = fs.readFileSync("input16.txt");
let data = read.toString().split('\n')
let ticket = ["children: 3","cats: 7","samoyeds: 2","pomeranians: 3","akitas: 0","vizslas: 0","goldfish: 5","trees: 3","cars: 2","perfumes: 1"]
data.pop()
let partOne
let partTwo

for(let aunt of data){
    let c = 0
    for(let el of ticket){
        aunt.includes(el) ? c++ : undefined
    }
    if(c==3){
        partOne = aunt.split(' ')[1]
        console.log("Part one = " +partOne.substring(0,partOne.length-1))
    }
}

let ticketP2_1 = {cats:7,trees:3,pomenarians:3,goldfish:5}
let ticketP2_2 = ["children: 3","samoyeds: 2","akitas: 0","vizslas: 0","cars: 2","perfumes: 1"]

for(let aunt of data){
    let c = 0
    for(let el of ticketP2_2){
        aunt.includes(el) ? c++ : undefined
    }
    for(const [name, value] of Object.entries(ticketP2_1)){
        if(aunt.includes(name)){
            let amount = aunt.split(' ')[aunt.split(' ').indexOf(`${name}:`)+1]
            amount = parseInt(amount.substring(0,amount.length-1))
            if(name=="cats" || name=="trees"){
                amount > value ? c++ : undefined
            }else{
                amount < value ? c++ : undefined
            }
        }
    }

    if(c==3){
        partTwo = aunt.split(' ')[1]
        console.log("Part one = " +partTwo.substring(0,partTwo.length-1))
    }
}