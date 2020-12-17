var fetch = require('node-fetch');

const getData = async (url)  => {
    try {
      const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
      let result = await response.json();
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
    } catch (error) {
      console.log(error);
    }
  };
  let url = 'https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json';

  getData(url);