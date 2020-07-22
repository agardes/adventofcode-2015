let fs = require('fs');
const { type } = require('os');
const { isFunction } = require('util');
let read = fs.readFileSync("input12.txt");
let data = read.toString().split('\n').map(el=>el.split(' '))
let digit = /(\d+)|-\d+/g
let count = 0
let o = JSON.parse(data[0])
recursive(o)

console.log("Part one = " + JSON.stringify(data[0]).match(digit).map(Number).reduce((a,b)=>a+b))
console.log("Part two = " + count)


function recursive(o){
    if(Array.isArray(o)){
        for(el of o){
            if(!isNaN(el) && typeof el !== "object"){
                count+=parseInt(el)
            }
            typeof el == "object" ? recursive(el) : undefined
        }

    }else{
        for (const [key, value] of Object.entries(o)) {
          if(value=="red"){
              return
          }
        }         
        for (const [key, value] of Object.entries(o)) {
              if(!isNaN(value) && typeof value !== "object"){
                  count+=parseInt(value)
              }
              typeof value == "object" ? recursive(value) : undefined
          }  
    }


}


