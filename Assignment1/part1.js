// JSON file import
const data = require('./battles.json');

// Structure to store output
let output = {
    'most_active': {
        'attacker_king': '',
        'defender_king': '',
        'region': '',
        'name': ''
    }
    ,
    'attacker_outcome': {
        'win': 0,
        'loss': 0
    },
    'battle_type': [],
    'defender_size': {
        'average': 0,
        'min': 0,
        'max': 0
    }
}

// Functions to populate output structure
function findMostFrequent(arr) {
    let compare = "";
    let mostFreq = "";

    arr.reduce((acc, val) => {
        if (val in acc) {
            acc[val]++;
        } else {
            acc[val] = 1;
        }
        if (acc[val] > compare) {

            compare = acc[val];
            mostFreq = val;
        }
        return acc;
    }, {})
    return mostFreq;
}


function setMostActiveAttackerKing() {

    let attackerKingArr = [];
    data.forEach(element => {
     attackerKingArr.push(element.attacker_king);
    });
    output['most_active'].attacker_king = findMostFrequent (attackerKingArr);
}

function setMostActiveDefenderKing() {

    let defenderKingArr = [];
    data.forEach(element => {
     defenderKingArr.push(element.defender_king);
    });
    output['most_active'].defender_king = findMostFrequent (defenderKingArr);
}

function setMostActiveRegion() {

    let regionArr = [];
    data.forEach(element => {
     regionArr.push(element.region);
    });
    output['most_active'].region = findMostFrequent (regionArr);
}

function setMostActiveName(){
    output['most_active'].name= "All the Names occur only once.";
}

function setAttackerOutcome() {

    data.forEach(element => {
        if (element.attacker_outcome == 'win')
            output['attacker_outcome'].win++;
        else
            output['attacker_outcome'].loss++;
    });
}


function setBattleType() {
    data.forEach(element => {
        if (!(output['battle_type'].includes(element.battle_type)) && element.battle_type != '')
            output['battle_type'].push(element.battle_type);
    });
}

function setDefenderSize() {
    let sumDefenderSize = 0;

    output['defender_size'].min = data[0].defender_size;
    output['defender_size'].max = data[0].defender_size;

    data.forEach(element => {

        if (element.defender_size < output['defender_size'].min && element.defender_size != null)
            output['defender_size'].min = element.defender_size;

        if (element.defender_size > output['defender_size'].max && element.defender_size != null)
            output['defender_size'].max = element.defender_size;


        sumDefenderSize += element.defender_size;
    });
    output['defender_size'].average = parseInt(sumDefenderSize / data.length);
}


// Function calls
// Comment/Uncommment function calls to go through population of output structure

setMostActiveAttackerKing();
setMostActiveDefenderKing();
setMostActiveRegion();
setMostActiveName()


setAttackerOutcome();

setBattleType();

setDefenderSize();

console.log(output);

