var fetch = require('node-fetch');

const getData = async (url,lb,ub,sub)  => {
    try {
      const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
      let result = await response.json();
      result = result["prizes"];
      for (let i = 0; i < result.length; i++) 
      {
        
        if ((parseInt(result[i]["year"]) >= lb && parseInt(result[i]["year"]) <= ub) )
        {
            if (result[i]["category"].toLowerCase() == sub.toLowerCase() && result[i]["laureates"] != undefined)
            {
                let winners = "";
                for (let j = 0; j < result[i]["laureates"].length ; j++ )
                {
                    winners += result[i]["laureates"][j]["firstname"] + " " + result[i]["laureates"][j]["surname"] + ", "; 
                }
                if (result[i]["laureates"].length  == 1)
                {
                    console.log("The winner of the Nobel Prize for " + sub + " in the year "+ result[i]["year"] +  " was " + winners.substring(0,winners.lastIndexOf(",")));   
                }
                else
                {
                    console.log("The winners of the Nobel Prize for " + sub + " in the year "+ result[i]["year"] +  " were " + winners.substring(0,winners.lastIndexOf(",")));
                }
                
            }
            else if (result[i]["category"].toLowerCase() == sub.toLowerCase() && result[i]["laureates"] == undefined)
            {
             console.log("In the year " + result[i]["year"] + ", there were no winners as " +  result[i]["overallMotivation"]);
            }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  let url = 'http://api.nobelprize.org/v1/prize.json';
  let lb = process.argv[3]? parseInt(process.argv[3]):   2000;//lower  bound for the year
  let ub = process.argv[2]? parseInt(process.argv[2]): 2019;// upper bound for the year
  if (ub < lb)
  {
    let x =  ub;
    ub = lb;
    lb = x;
  }
  let sub = process.argv[4]? process.argv[4]: "chemistry";
  getData(url,lb,ub,sub);