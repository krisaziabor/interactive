function fetchPlayer(playerId) {
    fetch(`http://localhost:3000/player/${playerId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Player not found');
            }
            return response.json();
        })
        .then((data) => {
            document.getElementById('player-name').innerText = `${data.name}`;
        })
        .catch((error) => {
            document.getElementById('player-name').innerText = `${error.message}`;
        });
}

window.fetchPlayer = fetchPlayer;