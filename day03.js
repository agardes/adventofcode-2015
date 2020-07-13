
let fs = require('fs');
let read = fs.readFileSync("input03.txt");
let data = read.toString().split('')


const day03 = {
    posY:0,
    posX:0,
    robotX:0,
    robotY:0,
    coords:['0,0'],
    coordsRobot:['0,0'],
    partOne() {
        for(let dir of data){
            dir == ">" ? this.posX++ : dir == "<" ? this.posX-- : dir=="^" ? this.posY-- : dir=="v"? this.posY++ :undefined
            let newDir = `${this.posX.toString()},${this.posY.toString()}`
            this.coords.indexOf(newDir) == -1 ? this.coords.push(newDir) : undefined
        }
      console.log(`Part one = ${this.coords.length}`)
    },
    partTwo(){
        this.posX = 0
        this.posY = 0
        this.coords = ['0,0']
        for(let i = 0; i < data.length; i+=2){
            let dirSanta = data[i]
            let dirRobot = data[i+1]
            dirSanta == ">" ? this.posX++ : dirSanta == "<" ? this.posX-- : dirSanta=="^" ? this.posY-- : dirSanta=="v"? this.posY++ :undefined
            dirRobot == ">" ? this.robotX++ : dirRobot == "<" ? this.robotX-- : dirRobot=="^" ? this.robotY-- : dirRobot=="v"? this.robotY++ :undefined
            let newDir = `${this.posX.toString()},${this.posY.toString()}`
            let newDirRobot = `${this.robotX.toString()},${this.robotY.toString()}`
            this.coords.indexOf(newDir) == -1 ? this.coords.push(newDir) : undefined
            this.coordsRobot.indexOf(newDirRobot) == -1 ? this.coordsRobot.push(newDirRobot) : undefined
        }
        let final = new Set([...this.coordsRobot, ...this.coords])
        console.log(`Part two = ${final.size}`)
    }
}

day03.partOne()
day03.partTwo()