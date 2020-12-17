const fetch = require('node-fetch');
var Set = require("collections/set");


function mode(array)
{
  ///count the most frequent item in a given array
  // ie.. the mode
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}
function getAnswer(URL)
{
  // """
  // get the answer after passing the URL in the format specified by the question 
  //  
  // """
  const promise = fetch(URL);
  promise.then(function(response) {
    const processingPromise = response.json();
    return processingPromise;
  })
  .then(function(processedResponse) {
    var defenderSize = 0;//to calculate the total sum of the defender's armies and get the average
    var minDefenderSize = Number.MAX_VALUE;//to find the minimum size of the defender's army
    var maxDefenderSize = Number.MIN_VALUE;// to find the maximum size of the defender's armys
    var attackerWin = 0;// count the number of times the attackers win
    var attackerLoss = 0;//count the number of times the attackers lose
    var uniqueBattleTypes = new Set();//to use a set data structure to get the valid battle types
    var attacker_king = [];//get the list of attacker kings
    var defender_king = [];// get the list of defender kings 
    var region = [];// get the list of the regions
    var name = [];// get the names of the battle.
    var battleCount  = processedResponse.length;
    for (let i = 0 ; i < processedResponse.length; i++)
    {
      let x = processedResponse[i];
      if (typeof(x["defender_size"]) != "string")
      {
        defenderSize += parseInt(x["defender_size"]);
        minDefenderSize = Math.min(minDefenderSize,parseInt(x["defender_size"]));
        maxDefenderSize = Math.max(maxDefenderSize,parseInt(x["defender_size"]));
      }
      if (x["attacker_outcome"] == "win")
      {
        attackerWin++;
      }
      else if (x["attacker_outcome"] == "loss")
      {
        attackerLoss++;
      }
      if (x["battle_type"] != "")
      {
        uniqueBattleTypes.add(x["battle_type"]);
      }
      attacker_king.push(x["attacker_1"]);
      defender_king.push(x["defender_1"]);
      region.push(x["location"]);
      name.push(x["name"]);
    }
    // console.log(attackerLoss,attackerWin,defenderSize/battleCount,uniqueBattleTypes);
    // console.log();
    let  output = {"most_active":{
      'attacker_king':mode(attacker_king) ,
      'defender_king':mode(defender_king) ,
      'region':mode(region) ,
      'name':mode(name)
    },
    'attacker_outcome' :{
      'win': attackerWin ,// total win
      'loss': attackerLoss // total loss
    },
    'battle_type':uniqueBattleTypes.size, // unique battle types
    'defender_size': {
    'average':defenderSize/battleCount ,
    'min':minDefenderSize ,
    'max':maxDefenderSize
    }
  };
  console.log(output);
  });
}
let URL = "https://api.npoint.io/85b6a16663ae8a1b86e3";
getAnswer(URL);
// console.log("this will log first");