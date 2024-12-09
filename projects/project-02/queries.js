import { app, db } from './server.js';

app.get('/player/:id', (req, res) => {
    const playerID = req.params.id;

    const query = 'SELECT name FROM players WHERE id = ?';
    db.query(query, [playerID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        if (results.length > 0) {
            res.json({ name: results[0].name });
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    });
});

// Remove the duplicate server listen call
// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });