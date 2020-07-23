let fs = require('fs');
let read = fs.readFileSync("input15.txt");
let data = read.toString().split('\n')
data.pop()
let ingredients = []
for(let row of data){   
    row = row.split(' ')
    let el = [row[2].substring(0,row[2].length-1),
              row[4].substring(0,row[4].length-1),
              row[6].substring(0,row[6].length-1),
              row[8].substring(0,row[8].length-1),
              row[10]].map(Number)
    ingredients.push(el)  
}
let partOne = 0
let partTwo = 0

for(let a=1;a<=97;a++){
    for(let b=1;b<=97;b++){
        for(let c=1;c<=97;c++){
            let d = 100-(a+b+c)
            if(d<1){
                break
            }
            let capacity = (a*ingredients[0][0])+(b*ingredients[1][0])+(c*ingredients[2][0])+(d*ingredients[3][0])
            if(capacity<1){
                break
            }
            let durability = (a*ingredients[0][1])+(b*ingredients[1][1])+(c*ingredients[2][1])+(d*ingredients[3][1])
            if(durability<1){
                break
            }
            let flavor = (a*ingredients[0][2])+(b*ingredients[1][2])+(c*ingredients[2][2])+(d*ingredients[3][2])
            if(flavor<1){
                break
            }
            let texture = (a*ingredients[0][3])+(b*ingredients[1][3])+(c*ingredients[2][3])+(d*ingredients[3][3])
            if(texture<1){
                break
            }
            
            let res = capacity*durability*flavor*texture
            partOne = res > partOne ? res : partOne

            let calories = (a*ingredients[0][4])+(b*ingredients[1][4])+(c*ingredients[2][4])+(d*ingredients[3][4])
            if(calories==500){
                partTwo = res > partTwo ? res : partTwo
            }
            
        }
    }
}

console.log(`Part one = ${partOne}`)
console.log(`Part two = ${partTwo}`)