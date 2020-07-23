let fs = require('fs');
let read = fs.readFileSync("input14.txt");
let data = read.toString().split('\n')
data.pop()
let schema = {}
let deers = []
let partOne = 0
let partTwo = 0

for(let row of data){   
    row = row.split(' ')
    deers.indexOf(row[0])<0?deers.push(row[0]) : undefined
    let el = [parseInt([row[3]]),parseInt([row[6]]),parseInt(row[13]),false,0,parseInt([row[6]]),parseInt(row[13]),0]
    // 0 = KM/S - 1 = FLYING SECONDS - 2 = RESTING SECONDS - 3 = is resting ? - 4 = total kms - 5 = flying seconds left - 6 = resting seconds left - 7 = partTwo
    schema[row[0]] = el
}

let seconds = 2503

for(let i=1;i<seconds;i++){
    for(let thisdeer of deers){
        let deer = schema[thisdeer]    
        if(!deer[3]){
            deer[5]--
            deer[4]+=deer[0]
            if(deer[5]==0){
                deer[3] = true
                deer[5] = deer[1]
            }
        }else{
            deer[6]--
            if(deer[6]==0){
                deer[6] = deer[2]
                deer[3] = false
            }
        }
        partOne = deer[4] > partOne ? deer[4] : partOne 
    }

    /// PART TWO
    for(const [name, value] of Object.entries(schema)){
        value[4] == partOne ? value[7]++ : undefined
        partTwo = value[7] > partTwo ? value[7] : partTwo
    }
}
console.log(partOne)
console.log(partTwo)
