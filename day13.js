let fs = require('fs');
let read = fs.readFileSync("input13.txt");
let data = read.toString().split('\n')
data.pop()

let schema = {}
let person = []

for(let row of data){   
    row = row.split(' ')
    person.indexOf(row[0])<0?person.push(row[0]) : undefined
    schema[row[0]] ? undefined : schema[row[0]] = []
    let amount = row[2] == "gain" ? parseInt(row[3]) : parseInt(row[3])*-1
    let last = row[row.length-1].substring(0, row[row.length-1].length - 1)
    let el = {[last]:amount}
    schema[row[0]].push(el)
}

let totalPerson = person.length

//// PART TWO - uncomment

// schema['me'] = []
// for(let name of person){
//     el = {[name]:0}
//     schema['me'].push(el)
//     schema[name].push({"me":0})

// }
// totalPerson = person.length+1


let maxHappy = 0

function search(person,placed=[]){
    let choices = schema[person]
    for(el of choices){     
        for(const [to, value] of Object.entries(el)){
            placed = [...placed]  
            if(placed.indexOf(person)<0){
                placed.push(person)
            }
            if(placed.indexOf(to)<0){
                if(placed.length==totalPerson-1){
                        placed.push(to)
                        let d =  getDistance(placed)
                        maxHappy = maxHappy >= d ? maxHappy : d 
                        return d
                }else{
                    search(to,placed)
                }
            }


        }
    }
    
}


function getDistance(arr){
    let res = 0
    for(let i=0;i<arr.length;i++){
       let from = arr[i]
       let two = arr[i+1] || arr[(i+1)%arr.length]
       let maps = schema[from]
       for(el of maps){
        for(const [to, value] of Object.entries(el)){
            if(to==two){
                res+=value
                let maps2 = schema[to]
                for(el2 of maps2){
                    for(const [to2,value2] of Object.entries(el2)){
                        if(to2==from){
                            res+=value2
                        }
                    }

                }


            }
        }
       }


    }

    return res
}


for(let i=0;i<person.length;i++){
    search(person[i])
}
console.log(maxHappy)

