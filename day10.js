let input = "1113122113"
//// PART ONE
let times = 40

//// PART TWO
// times = 50

let raw = input.split('').map(Number)

for(let x=0;x<times;x++){
   let modified = [] 
   for(let i=0;i<raw.length;i++){
       let similar = true
       let inc = 1
       while(similar && i+inc<raw.length){
           raw[i] == raw[i+inc] ? inc++ : similar = false
       }
       modified.push(inc)
       modified.push(raw[i])
       i+=inc-1
   }
   
   raw = modified
}


console.log(`Result = ${raw.length}`)
