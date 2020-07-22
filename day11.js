
let input = "vzbxkghb"
let regForbid = /[ilo]/g
let regDouble = /([a-z])\1/g
let alphabet = "abcdefghijklmnopqrstuvwxyz".split('')

function isValid(str){
    if(str.match(regForbid)){
        return false
    }
 
    if(!str.match(regDouble) || str.match(regDouble).length<2){
        return false
    }

    for(let i=0;i<str.length;i++){
        let a = alphabet.indexOf(str[i])
        let b = alphabet.indexOf(str[i+1])
        let c = alphabet.indexOf(str[i+2])
        if(a+1==b && b+1==c){
            return true
        }
    }
    return false
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

let searching = true
let k = 0

let counts = {}
function recursive(index){
    !counts[index] ? counts[index] = 0 : undefined

	if(index==0){


		while(counts[index]<27 && searching){

			counts[index+1]  = 0

			if(counts[index]>0){
		
            			if(input.charAt(index)=="z"){
                			input = input.replaceAt(index,"a")
                			counts[index] = 27 
            			}else{
                			let ind = alphabet.indexOf(input.charAt(index))
        	        		input = input.replaceAt(index,alphabet[(ind+1)%alphabet.length])
	           		}

            }
            
        counts[index] = counts[index]+1
		recursive(index+1)
		}

		

    }else if(index==7 && searching){
        while(counts[index]<27 && counts[index-1] !== 27){
            counts[index-1] == 27 ? counts[index-1] = 0 : undefined
            if(isValid(input)){

                k++
                k==1?console.log(`Part one = ${input}`):console.log(`Part two = ${input}`)  
                if(k==2){
                 searching = false  
                }              
                return
            }
			
                		if(input.charAt(index)=="z"){
                    		input = input.replaceAt(index,"a")
                   		    counts[index]=27   
                	}else{
                    		let ind = alphabet.indexOf(input.charAt(index))
                    		input = input.replaceAt(index,alphabet[(ind+1)%alphabet.length])
                	}
                
                
        counts[index] = counts[index] == 27 ? 27 : counts[index]+1
	
		}

    
    }else{
		
		while(counts[index]<27 && counts[index-1] !== 27 && searching){
            counts[index+1] = 0
			counts[index-1] >= 27 ? counts[index-1] = 0 : undefined
			if(counts[index]>0){
                		if(input.charAt(index)=="z"){
                    		input = input.replaceAt(index,"a")
                   		    counts[index]=27   
                	}else{
                    		let ind = alphabet.indexOf(input.charAt(index))
                    		input = input.replaceAt(index,alphabet[(ind+1)%alphabet.length])
                	}
                }
                
        counts[index] = counts[index] == 27 ? 27 : counts[index]+1
		recursive(index+1)
	
		}
	
	

	}
}


while(searching){
    recursive(0)
}