const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config({ path: "./private.env" });

// Replace the following with your Atlas connection string
const url = process.env.URL;

// Connect to your Atlas cluster
const client = new MongoClient(url);

module.exports = { client };