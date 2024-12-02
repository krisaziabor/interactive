import { client } from "../mongodb-config.js";

async function fetchMatchesWithPlayerDetails() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the database and collections
    const db = client.db("matches_db");
    const matchesCollection = db.collection("matches");

    // Perform the aggregation
    const matches = await matchesCollection.aggregate([
      {
        $lookup: {
          from: "players", // Join with the players collection
          localField: "winner_id", // Match winner_id in matches
          foreignField: "_id", // To _id in players
          as: "winner_details", // Output field for winner details
        },
      },
      {
        $lookup: {
          from: "players", // Join with the players collection
          localField: "loser_id", // Match loser_id in matches
          foreignField: "_id", // To _id in players
          as: "loser_details", // Output field for loser details
        },
      },
      {
        $project: {
          _id: 1,
          sport_id: 1,
          date: 1,
          scores: 1,
          "winner_details.name": 1, // Include winner's name
          "loser_details.name": 1, // Include loser's name
        },
      },
    ]).toArray();

    console.log("Matches with player details:", matches);
  } catch (error) {
    console.error("Error fetching matches with player details:", error);
  } finally {
    // Close the client connection
    await client.close();
  }
}

fetchMatchesWithPlayerDetails();