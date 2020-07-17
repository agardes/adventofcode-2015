let fs = require('fs');
let read = fs.readFileSync("input07.txt");
let data = read.toString().split('\n').map(el=>el.split(' '))

let identifiers = {}
let waitingList = {}
let done = []



for(let command of data){
    for(let el of command){
        el.toLowerCase() == el && el != "->"  && isNaN(parseInt(el)) ? identifiers[el] = undefined : undefined
    }
}

function bitwiseNot(el){
    let bin = (el >>> 0).toString(2)
    bin = "0000000000000000".substr(bin.length) + bin
    bin = bin.split('').map(el=> el == "0" ? el = "1" : "0")
    return parseInt(bin.join(''),2)
}

function execute(cmd,a,b,output){

    if(cmd=="transfer"){
        if(isNaN(a)){
            identifiers[b] = identifiers[a]
        }else{
            identifiers[b] = parseInt(a)
        }
    }else if(cmd=="not"){
        identifiers[b] = bitwiseNot(identifiers[a])
    }else if(cmd=="RSHIFT"){
        identifiers[output] = identifiers[a]>>parseInt(b)
    }else if(cmd=="LSHIFT"){
        identifiers[output] = identifiers[a]<<parseInt(b)
    }else if(cmd=="AND"){
        if(isNaN(a)){
            identifiers[output] = identifiers[a]&identifiers[b]
        }else{
            identifiers[output] = parseInt(a)&identifiers[b]
        }
        
    }else if(cmd=="OR"){
        identifiers[output] = identifiers[a]|identifiers[b] 
    }
}

function recursive(command,i){
    if(command.length==3){
        if(isNaN(command[0]) && identifiers[command[0]]==undefined){
            waitingList[command[0]] = waitingList[command[0]] || []
            let n = [i]
            waitingList[command[0]].push(n)
        }else{
            execute("transfer",command[0],command[2])
            done.indexOf(i) < 0 ? done.push(i) : undefined
            if(waitingList[command[2]]){
                for(let i=0; i<waitingList[command[2]].length;i++){
                    let  el = waitingList[command[2]][i]
                    let nextCmd = data[el[0]]
                    if(el.length>1){
                        if(identifiers[el[1]]!==undefined){
                            waitingList[command[2]].splice(i,1)
                            waitingList[el[1]] = waitingList[el[1]].filter(elem => elem[0] !== el[0])
                            i--
                            recursive(nextCmd,el[0])
                        }
                    }else{
                        waitingList[command[2]].splice(i,1)
                        i--
                        recursive(nextCmd,i)
                    }
                }
            }


        }
    }else if(command.length==4){
        if(isNaN(command[1]) && identifiers[command[1]]==undefined){
            waitingList[command[1]] = waitingList[command[1]] || []
            let n = [i]
            waitingList[command[1]].push(n)
        }else{
            execute('not',command[1], command[3])
            done.indexOf(i) < 0 ? done.push(i) : undefined
            if(waitingList[command[3]]){
                for(let i=0; i<waitingList[command[3]].length;i++){
                    let  el = waitingList[command[3]][i]
                    let nextCmd = data[el[0]]
                    if(el.length>1){
                        if(identifiers[el[1]]!==undefined){
                            waitingList[command[3]].splice(i,1)
                            waitingList[el[1]] = waitingList[el[1]].filter(elem => elem[0] !== el[0])
                            i--
                            recursive(nextCmd,el[0])
                        }
                    }else{
                        waitingList[command[3]].splice(i,1)
                        i--
                        recursive(nextCmd,i)
                    }
                }
            }

        }

    }else{
        if(!isNaN(command[0]) && identifiers[command[2]]==undefined ){
            waitingList[command[2]] = waitingList[command[2]] || []
            let n = [i]
            waitingList[command[2]].push(n)

        }else if(isNaN(command[0]) && identifiers[command[0]]==undefined){
            waitingList[command[0]] = waitingList[command[0]] || []
            let n = [i]
            isNaN(command[2]) ? n.push(command[2]) : undefined
            waitingList[command[0]].push(n)

            if(isNaN(command[2]) && identifiers[command[2]]==undefined){
                waitingList[command[2]] = waitingList[command[2]] || []
                let n = [i]
                isNaN(command[0]) ? n.push(command[0]) : undefined
                waitingList[command[2]].push(n)  
            }

        }else{
            if(command[1] == "LSHIFT" || command[1] == "RSHIFT"){
                execute(command[1],command[0],command[2], command[4])
                done.indexOf(i) < 0 ? done.push(i) : undefined

                if(waitingList[command[4]]){
                    for(let i=0; i<waitingList[command[4]].length;i++){
                        let  el = waitingList[command[4]][i]
                        let nextCmd = data[el[0]]
                        if(el.length>1){
                            if(identifiers[el[1]]!==undefined){
                                waitingList[command[4]].splice(i,1)
                                waitingList[el[1]] = waitingList[el[1]].filter(elem => elem[0] !== el[0])
                                i--
                                recursive(nextCmd,el[0])
                            }
                        }else{
                            waitingList[command[4]].splice(i,1)
                            i--
                            recursive(nextCmd,i)
                        }
                    }
                }
                
            }else{
                if(identifiers[command[2]]!=undefined){
                    execute(command[1],command[0],command[2],command[4])
                    done.indexOf(i) < 0 ? done.push(i) : undefined

                    if(waitingList[command[4]]){
                        for(let i=0; i<waitingList[command[4]].length;i++){
                            let  el = waitingList[command[4]][i]
                            let nextCmd = data[el[0]]
                            if(el.length>1){
                                if(identifiers[el[1]]!==undefined){
                                    waitingList[command[4]].splice(i,1)
                                    waitingList[el[1]] = waitingList[el[1]].filter(elem => elem[0] !== el[0])
                                    i--
                                    recursive(nextCmd,el[0])
                                }
                            }else{
                                waitingList[command[4]].splice(i,1)
                                i--
                                recursive(nextCmd,i)
                            }
                        }
                    }

                }
            }




        }
    }

}


function run(){
 let searching = true
 while(searching){

    if(done.length==data.length+1){
        searching = false;
    }

    for(let i=0;i<data.length;i++){
        if(done.indexOf(i)==-1){
            let command = data[i]
            recursive(command,i)
        }
       
    }
}
}

run()
let partOne = identifiers['a']
console.log(`Part one = ${partOne}` )

// PART TWO 

// reset data and change wire b value
data = data.map(el =>{
   el[el.length-1] == "b" ? el[0] = partOne : el[0] = el[0]
   return el 
})

waitingList = []
done = []

Object.keys(identifiers).map(function(key, index) {
    identifiers[key] = undefined;
  });


run()

console.log(`Part two = ${identifiers['a']}` )


