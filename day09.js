let fs = require('fs');
let read = fs.readFileSync("input09.txt");
let data = read.toString().split('\n')
data.pop()

let cities = {}
let city = []

for(let row of data){
    row = row.split(' ')    
    city.indexOf(row[0])<0?city.push(row[0]) : undefined
    city.indexOf(row[2])<0?city.push(row[2]) : undefined
    cities[row[0]] ? undefined : cities[row[0]] = []
    let el = {[row[2]]:parseInt(row[4])}
    cities[row[0]].push(el)
    let el2 = {[row[0]]:parseInt(row[4])}
    cities[row[2]] ? undefined : cities[row[2]] = []
    cities[row[2]].push(el2)
}
let totalStops = Object.keys(cities).length

let minDist = 100000000
let maxDist = 0

function getDistance(arr){
    let res = 0
    for(let i=0;i<arr.length;i++){
       let from = arr[i]
       let two = arr[i+1]
       let maps = cities[from]
       for(el of maps){
        for(const [to, value] of Object.entries(el)){
            to == two ? res+=value : undefined
        }
       }

    }

    return res
}

function search(from,visited=[]){
    let maps = cities[from]
    for(el of maps){     
        for(const [to, value] of Object.entries(el)){
            visited = [...visited]  
            if(visited.indexOf(from)<0){
                visited.push(from)
            }
            if(visited.indexOf(to)<0){
                if(visited.length==totalStops-1){
                        visited.push(to)
                        let d =  getDistance(visited)
                        minDist = minDist <= d ? minDist : d
                        maxDist = maxDist >= d ? maxDist : d 
                        return d
                }else{
                    search(to,visited)
                }
            }


        }
    }
    
}

for(let i=0;i<city.length;i++){
    search(city[i])
}

console.log(`Part one : ${minDist}`)
console.log(`Part two : ${maxDist}`)
