/// name - damage - cost
const weapons = [['dagger',4,8],['shortsword',5,10],['warhammer',6,25],['longsword',7,40],['greataxe',8,74]]
/// name - armor - cost
const armors = [['leather',1,13],['chainmail',2,31],['splintmail',3,53],['bandedmail',4,75],['platemail',5,102]]
// name - armor/damage - cost
const rings = [['dam',1,25],['dam',2,50],['dam',3,100],['def',1,20],['def',2,40],['def',3,80]]


let boss = {
    hp:104,     /// YOUR INPUT
    damage:8,   /// YOUR INPUT
    armor:1,    /// YOUR INPUT
    reset(){
        this.hp=104     /// YOUR INPUT
        this.damage=8   /// YOUR INPUT
        this.armor=1    /// YOUR INPUT
    }
}

let player = {
    hp:100,
    damage:0,
    armor:0,
    reset(){
        this.hp=100
        this.damage=0
        this.armor=0
    }
}

let minMoney = Number.MAX_SAFE_INTEGER
let maxMoney = Number.MIN_SAFE_INTEGER

for(let i=0;i<weapons.length;i++){
    let cost = weapons[i][2]
    player.damage += weapons[i][1]
    minMoney = fight() && cost < minMoney ? cost : minMoney
    maxMoney = !fight() && cost > maxMoney ? cost : maxMoney
    for(let j=0;j<armors.length;j++){
        cost+=armors[j][2]
        player.armor += armors[j][1]
        minMoney = fight() && cost < minMoney ? cost : minMoney
        maxMoney = !fight() && cost > maxMoney ? cost : maxMoney
        chooseRings(cost)
        cost = weapons[i][2]
        player.armor = 0
    }
    chooseRings(cost)
    player.reset()
    
}

function fight(){
    boss.hp = 104
    player.hp = 100
    while(boss.hp>0 || player.hp>0){
        let damageFirst = player.damage - boss.armor
        damageFirst>1 ? boss.hp -= damageFirst : boss.hp -= 1
        if(boss.hp<1){
            return true
        }
        let damageSecond = boss.damage - player.armor
        damageSecond>1 ? player.hp -= damageSecond : player.hp -= 1
        if(player.hp<1){
            return false
        }
    }
}

function chooseRings(cost){
    for(let k=0;k<rings.length;k++){
        cost+=rings[k][2]
        rings[k][0]=="dam" ? player.damage += rings[k][1] :  player.armor += rings[k][1]
        minMoney = fight() && cost < minMoney ? cost : minMoney
        maxMoney = !fight() && cost > maxMoney ? cost : maxMoney
        for(let l=0;l<rings.length;l++){
            if(l==k){
                continue
            }
            cost+=rings[l][2]
            rings[l][0]=="dam" ?  player.damage += rings[l][1] :  player.armor += rings[l][1]
            minMoney = fight() && cost < minMoney ? cost : minMoney
            maxMoney = !fight() && cost > maxMoney ? cost : maxMoney
            rings[l][0]=="dam" ? player.damage -= rings[l][1] :player.armor -= rings[l][1]
            cost-=rings[l][2]
        }
        rings[k][0]=="dam" ?   player.damage -= rings[k][1] :  player.armor -= rings[k][1]
        cost-=rings[k][2]

    }
}
console.log(`Part one = ${minMoney}`)
console.log(`Part two = ${maxMoney}`)