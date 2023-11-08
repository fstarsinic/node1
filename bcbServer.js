const express = require('express');
const router = express.Router();

const app = express();

const playerRoutes = require('./routes/playerRoutes');
app.use('/api/player', playerRoutes);

const gameRoutes = require('./routes/gameRoutes');
app.use('/api/game', gameRoutes);

const teamRoutes = require('./routes/teamRoutes');
app.use('/api/team', teamRoutes);


// Middleware and other configurations
const cors = require('cors');
const path = require('path');
app.use(express.json()); // JSON request body parsing
app.use(cors());

const port = process.env.port || 80;

// Enable CORS for all routes

console.log('doing something')
console.log(path.join(__dirname, 'public', 'index.html'))
console.log('doing something else')

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/sbadmin', express.static('sbadmin'));
app.use('/images', express.static('images'));
app.set('view engine', 'ejs');


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    console.log('Testing...')
});
