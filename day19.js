let fs = require('fs');
let read = fs.readFileSync("input19.txt");
let data = read.toString().split('\r\n')
let start = data.pop()
data=data.map(el=> el.split('=>'))
data.pop()
let molecules = []
for(let i=0;i<data.length;i++){
  let reg = new RegExp(data[i][0].trim(), "g")
  while ((matches = reg.exec(start)) !== null) { 
    let s = start.substring(0,reg.lastIndex-data[i][0].length+1)+data[i][1].trim()+start.substring(reg.lastIndex)
    molecules.indexOf(s)<0 ? molecules.push(s) : undefined
  }
}
console.log(molecules.length)
