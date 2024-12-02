import { client } from "./mongodb-config.js";

async function run() {
    try {
        await client.connect();
        
        const db = client.db("matches_db");
        const matches = db.collection("matches");
        const players = db.collection("players");
        const sports = db.collection("sports");

        const recentMatches = await matches.find().sort({ date: -1 }).toArray();
        console.log(recentMatches);
        return recentMatches;

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}


run().catch(console.dir);