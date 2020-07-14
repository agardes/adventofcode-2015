let fs = require('fs');
let read = fs.readFileSync("input06.txt");
let data = read.toString().split('\n')
data.pop()

let obj = {}
let obj2= {}

for(let x=0;x<1000;x++){
    for(let y=0;y<1000;y++){
        let light = `${x},${y}`
        obj[light] = false
        obj2[light] = 0
    }
}

const day06 = {
    dir:data.map(el=>el.split(' ')),
    partOne(){

    
    for(let dir of this.dir){
        let [fromX,fromY] = dir[0] == "turn" ? dir[2].split(',').map(Number) : dir[1].split(',').map(Number)
        let [toX, toY] = dir[dir.length-1].split(',').map(Number)

        for(let x=fromX; x<=toX; x++){
            for(let y=fromY; y<=toY; y++){
                let light = `${x},${y}`
                if(dir[0] == "turn"){
                    if(dir[1]=="on"){
                        obj[light] = true
                        obj2[light]++
                    }else{
                        obj[light] = false
                        obj2[light] != 0 ? obj2[light]-- : undefined
                    }
                }else{
                    obj[light] = !obj[light]
                    obj2[light]+=2
                }
            }
        }

       }
       console.log(`Part one = ${Object.keys(obj).filter(function(key){
           return obj[key] == true
       }).length}`)
       console.log(`Part two = ${Object.keys(obj2).reduce(function(sum, key) {
        return sum + obj2[key];
    }, 0)}`)


    },
}

day06.partOne()

