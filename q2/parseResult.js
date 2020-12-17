// """
// Module to Parse the Saved Results
// """
const fs = require('fs');
const filePath = "data.json"
const fetch = require('node-fetch')

async function getLength(url) 
{
 const response = await fetch(url, {
    headers: {
              'Accept': 'application/vnd.github.cloak-preview+json',
              'Authorization': 'token ' + process.env.token // following proper procedure to keep API token secret
            }
    });   
 const data = await response.json();
 return data.length; 
}
async function getLength(url) 
{
 const response = await fetch(url, {
    headers: {
              'Accept': 'application/vnd.github.cloak-preview+json',
              'Authorization': 'token ' + process.env.token // following proper procedure to keep API token secret
            }
    });   
 const data = await response.json();
 return data.length; 
}
async function getItems()
{
    var listOfObjects = [];
    let data =  fs.readFileSync(filePath);  
    const users = (JSON.parse(data))["items"];
            for (let i = 0; i < users.length; i++) 
            {
                let s = users[i]["owner"]["following_url"];
                let x = users[i]["branches_url"];
                s.substring(s.lastIndexOf("/"))
                let myObject = {
                    "name": users[i]["name"], "full_name": users[i]["full_name"], "private": users[i]["private"],
                    "owner": {
                        "login": users[i]["owner"]["login"],
                        "name": users[i]["owner"]["url"],
                        "followersCount":  await getLength(users[i]["owner"]["followers_url"]), 
                        "followingCount": await getLength(s.substring(0, s.lastIndexOf("{")))
                    },
                    "licenseName": users[i]["license"],
                    "score": users[i]["score"],
                };
                myObject["numberOfBranch"] = await getLength(x.substring(0, x.lastIndexOf("{")));
                
                listOfObjects.push(myObject);
            }
            return listOfObjects;
}
exports.getItems = getItems;