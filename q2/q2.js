const fetch = require('node-fetch')
const fs = require('fs');
const parseResult = require("./parseResult")
const {createInterface} = require('readline')
const rl = createInterface ({
  input: process.stdin,
  output: process.stdout
})
var query = "tetris&sort=stars&order=desc";
    
 function main()
{
    rl.question('Enter a query or press enter to use the default query provided: ', response => {
        let n = (response)
        if (n != '')
        {
            query = response;
        }
        else
        {
            console.log("Okay. We are using the default query.")
        }
        console.log("Your query is ",query);
        const fetchPromise = fetch('https://api.github.com/search/repositories?q='+ query, {
                                headers: {
                                'Accept': 'application/vnd.github.cloak-preview+json',
                                'Authorization': 'token ' + process.env.token // following proper procedure to keep API token secret
                                    }
                            });
        fetchPromise.then(response => {
            return response.json();
        }).then(result => {
        fs.writeFileSync('./data.json', JSON.stringify(result, null, 2) , 'utf-8');
         let itemData =  parseResult.getItems();   
        //  console.log("The result " ,itemData);
        itemData.then(function(result) {
            console.log(result) 
            fs.writeFileSync('./result.json', JSON.stringify(result, null, 2) , 'utf-8');
            console.log("The result is saved in a file called result.json. \n ");
         })
        });
    
        rl.close()
      });
    
}
main()