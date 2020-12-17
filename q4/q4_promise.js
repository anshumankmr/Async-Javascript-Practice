var fetch = require('node-fetch');

const getData = async (url)  => {
    const fetchPromise = fetch(url);
    fetchPromise.then(response => {
      return response.json();
    }).then(result=> {
      for (let i = 0; i < result.length; i++) 
      {
        let x = result[i]["Statistics"]["Flights"];
        if (x["Cancelled"] + x["Delayed"] + x["Diverted"] + x["On Time"] == x["Total"])
        {
          console.log("There is no discrepancy in the number of flights at airport "+ result[i]["Airport"]["Name"] );
        }
        else
        {
          console.log("There is some discrepancy in the number of flights at airport "+ result[i]["Airport"]["Name"] );
        }
      }
    }).catch(err => console.log(err) );
    
      
    };
  let url = 'https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json';
  getData(url);