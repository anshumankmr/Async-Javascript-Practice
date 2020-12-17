# Javascript Assignment 

## Prerequisites

1) Need NodeJS installed on your machine
2) Unix Based OS (Preferably Ubuntu or MacOS)


## Project Description

### Getting Started with Question 1
Install the collections modules first.
```
npm install collections --save
```
### Getting Started with Question 2

Open the terminal on your machine
1) In order to create an API_KEY, refer to [this](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) link in order to get a **personal access token**. 


2) Create an environment variable using the API key gained from the last step.
```
export token=API_KEY
```

3) Install the [node-fetch](https://www.npmjs.com/package/node-fetch) module

```
npm install node-fetch
```


4) Change your directory to q2 and run the file q2.js in the terminal like so.

```
cd q2
node q2.js
```
A prompt appears 
```
Enter a query or press enter to use the default query provided: 
```
Enter your search query to get started and wait for the results to appear.
The default query is this 
>tetris&sort=stars&order=desc

This searches for the keyword "tetris" and sorts the results in  descending order by the number of the stars on the repositories.

Refer to [this](https://docs.github.com/en/free-pro-team@latest/github/searching-for-information-on-github/searching-for-repositories) documentation to learn how to do more complex searches.


### Getting Started with Question 3

To run the solution of the question using async-await, try this:
```
node q3_await.js 1999 2019 chemistry
```
The preferred order for the command line arguments are:
> first_year last_year subject

To run the solution using promise,run the other file like this

```
node q3_promise.js 1977 2020 peace
```

### Getting Started with Question 4

To run the solution of the question using async-await, try this:
```
node q4_await.js 
```
In order to run the solution using promise,run the other file like this

```
node q4_promise.js
```