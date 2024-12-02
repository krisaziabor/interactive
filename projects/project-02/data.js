const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config({path: "./private.env"});
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = process.env.URL;

// Connect to your Atlas cluster
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);