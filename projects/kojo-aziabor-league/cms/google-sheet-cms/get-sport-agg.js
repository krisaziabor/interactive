const data = {"aggregate":[["Name","Score"],["Kris",5],["Jay",6]],"sportSpecific":[["Sport","Name","Count"],["TENNIS","Kris",2],["TENNIS","Jay",1],["PING-PONG","Kris",0],["PING-PONG","Jay",3],["FIFA","Kris",2],["FIFA","Jay",0],["FM","Kris",1],["FM","Jay",2]]}

const scores = {};
data.aggregate.forEach(row => {
    const name = row[0];
    const score = row[1];
    scores[name] = score;
});

// console.log(scores.Jay);

const tennisScores = {"kris": 0, "jay": 0};
for (let i = 1; i < 3; i++) {
    const row = data.sportSpecific[i];
    const sport = row[0];
    const player = row[1];
    const count = parseInt(row[2], 10);
    if (sport === 'TENNIS') {
        tennisScores[player.toLowerCase()] += count;
    }
}

const pingpongscores = {"kris": 0, "jay": 0};
for (let i = 3; i < 5; i++) {
    const row = data.sportSpecific[i];
    const sport = row[0];
    const player = row[1];
    const count = parseInt(row[2], 10);
    if (sport === 'PING-PONG') {
        pingpongscores[player.toLowerCase()] += count;
    }
}

const fifascores = {"kris": 0, "jay": 0};
for (let i = 5; i < 7; i++) {
    const row = data.sportSpecific[i];
    const sport = row[0];
    const player = row[1];
    const count = parseInt(row[2], 10);
    if (sport === 'FIFA') {
        fifascores[player.toLowerCase()] += count;
    }
}

const fmscores = {"kris": 0, "jay": 0};
for (let i = 7; i < 9; i++) {
    const row = data.sportSpecific[i];
    const sport = row[0];
    const player = row[1];
    const count = parseInt(row[2], 10);
    if (sport === 'FM') {
        fmscores[player.toLowerCase()] += count;
    }
}


console.log(tennisScores);
console.log(pingpongscores);
console.log(fifascores);
console.log(fmscores);

module.exports = {
    tennisScores,
    pingpongscores,
    fifascores,
    fmscores
};