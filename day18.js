let fs = require('fs');
let read = fs.readFileSync("input18.txt");
let data = read.toString().split('\n').map(el=>el.split(''))
data.pop()
let size = 100
let steps = 100

/// PART TWO - Uncomment
// data[0][0] = "#"
// data[0][99] = "#"
// data[99][0] = "#"
// data[99][99] = "#"

while(steps>0){
    let newData = JSON.parse(JSON.stringify(data)) 
    for(let y=0;y<size;y++){
        for(let x=0;x<size;x++){
                // PART TWO - Uncomment
                // if((y==0 && x==0) || (y==0 && x==99) || (y==99 && x==0) || (y==99 && x==99)){
                //     continue
                // }
                let light = data[y][x]
                let nb = 0
                data[y][x-1] ? data[y][x-1] == "#" ? nb++ : undefined : undefined
                data[y][x+1] ? data[y][x+1] == "#" ? nb++ : undefined : undefined
                data[y-1] ? data[y-1][x] == "#" ? nb++ : undefined : undefined
                data[y+1] ? data[y+1][x] == "#" ? nb++ : undefined : undefined
                data[y-1] && x>0 ? data[y-1][x-1] == "#" ? nb++ : undefined : undefined
                data[y-1] && x<size-1 ? data[y-1][x+1] == "#" ? nb++ : undefined : undefined
                data[y+1] && x>0 ? data[y+1][x-1] == "#" ? nb++ : undefined : undefined
                data[y+1] && x<size-1 ? data[y+1][x+1] == "#" ? nb++ : undefined : undefined

                if(light=="#"){
                  newData[y][x] = nb==2 || nb==3 ?  "#" : "."  
                }else{
                   newData[y][x] = nb==3 ?  "#" : "." 
                }

        }
    }
    steps--
    data = JSON.parse(JSON.stringify(newData))
}
console.log("Solution = " + data.flat().filter(el=>el=="#").length)