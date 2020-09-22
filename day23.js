let fs = require('fs');
let read = fs.readFileSync("input23.txt");
let data = read.toString().split('\n').map(el=>el.split(' '))
data.pop()
let a = 0 /// Change to 1 for part two
let b = 0
for(let i=0;i<data.length;i++){
    let inst = data[i][0]
    let reg = inst!=='jmp' ? data[i][1][0] : undefined
    let offset
    let forward
    let amount
    if(inst[0]=='j'){
        offset = data[i][data[i].length-1]
        forward = offset[0] == "+" ? true : false
        amount = parseInt(offset.substring(1))
    }
    switch(inst){
        case 'inc':
            reg=='a' ? a++ : b++
            break
        case 'hlf':
            reg=='a' ? a = a/2 : b = b/2
            break
        case 'tpl':
            reg=='a' ? a = a*3 : b = b*3
            break
        case 'jmp':
            forward ? i+=(amount-1) : i-=(amount+1)
            break
        case 'jie':
            reg=='a' ? a%2==0 ? forward ? i+=(amount-1): i-=(amount+1) : undefined : b%2==0 ? forward ? i+=(amount-1) : i-=(amount+1) : undefined
            break
        case 'jio':
            reg=='a' ? a==1 ? forward ? i+=(amount-1) : i-=(amount+1) : undefined : b==1 ? forward ? i+=(amount-1) : i-=(amount+1) : undefined
            break 
    }
    if(i>=data.length || i==data.length-1){
        console.log('Solution : ' +b)
        break
    }
}