# 35LProject
# Arpeggio

Arppeggio is a web application for posting your favorite songs in response to various questions and viewing your friends' responses. Arpeggio aims to give people a new anbd simple way to share what they're listening to with their friends, regardless of what streaming service you use. 

You can check out our project demo [here](https://drive.google.com/file/d/1SygpgufzO7Tnvv8geAhYB35gw5ZCHrzY/view?usp=sharing).

## Installation

### Get the code

Make sure npm is installed on your

Clone the repository, `cd` into it if necessary, and install the requirements (assuming you already have [npm](https://www.npmjs.com/get-npm) installed on your machine):
```shell
git clone https://github.com/lucyz08/35LProject.git
cd ./35LProject
```
Split your terminal in two, and `cd` into both server and client. Use the following comands to install npm, one in each terminal:
```shell
cd server
npm install
```
```shell
cd client
npm install
```

## Setting up Database and Spotify API

### Connect to the Database

If you do not already have a MongoDB Atlas account, create one [here](https://www.mongodb.com/).

Create a MongoDB new database [tutorial](https://www.mongodb.com/basics/create-database).

Once on the "Choose a connection method" step, select the "Connect your application" option. From there, choose "Node.js" as the driver and "3.6 or later" as the version. Copy the provided connection string to your clipboard.

Go into the server.js (line 29) in the server directory and change the connection string to the string that you have copied from MongoDB.

Here is an example of what it should look like:
```
const CONNECTION_URL = 'mongodb+srv://<user>:<password>@35lproject.tnn1kyn.mongodb.net/test';
```

The database should now be ready for use.

### Create Spotify Dev App

Go to the [Spotify for Developers](https://developer.spotify.com/dashboard/), login and create an app using the following [tutorial](https://medium.com/@sedwardscode/creating-a-spotify-app-on-the-spotify-developer-page-16907b5872e8).

Once created change all instances of client_id and client_secret

There is one instance in the spotifyFunctions.js file in the server directory, change the following on line 18 the following with your client_id and client_secret in angle brackets.

```
body:'grant_type=client_credentials&client_id=' + "<client_id>" + '&client_secret=' + "<client_secret>"
```

There is one other instance in the server.js file in the server directory. In the AuthParameters variable change the client_id and client_secret to your corresponding strings where the angle brackets are.

```
  var AuthParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:'grant_type=client_credentials&client_id=' + "<client_id>" + '&client_secret=' + "<client_secret>"
  }

```

## Running the app

### How to start the app

Split the terminal in two, and `cd` into both server and client. Run the following command in both terminals: 
```bash
npm start
```
With this, the app should open in your browser on http://localhost:3000/. If it does not automatically open, simply type http://localhost:3000/ into your browser. Note that it may take some time for npm to start the server. 

Note: If having an issue with the node-fetch module try commenting out the code on line 5 of the spotifyFunctions.js file in the server directory. This would be because you are running a newer version of node and fetch is now native to node.

## Technology Stack and Acknowledgements
Our project was made using the MERN stack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). We used [Express](https://expressjs.com/) to route requests on a [Node.js](https://nodejs.org/) server to our [MongoDB](https://www.mongodb.com/) collections.

Our user interface is made possible by [Material UI](https://material-ui.com/). 

To implement the [Spoify API](https://developer.spotify.com/documentation/web-api/libraries/) we used a library called [spotify-node-api](https://github.com/thelinmichael/spotify-web-api-node). 

User authentication was made possible by [JSON Web Tokens](https://jwt.io/).

And of course credit the links we have used in this tutorial for tutorials.

## Creators
This CS35L Fall 2022 Final Project is brought to you by: Gene Bordegaray, Rohan Jain, Elizabeth Manka, Jake Ekoniak, and Lucy Zises. 
