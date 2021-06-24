const express = require('express');
const app = express();
const PORT = 4000

// Loading configuration file
const config = require("./config.json");
const DatabaseUri = config["DBUri"];

// Database client initialization
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(DatabaseUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Console Details
app.use(express.json());
app.listen(PORT, function(){
    client.connect();
    console.log("> Database Client Connected!");

    console.log("> ME-Note Backend API");
    console.log(`> Listening on http://localhost:${PORT}`);
});

// Route imports
require('./AppRoutes/RouteBase')(app);
require('./AppRoutes/RouteUser')(app, client);