const express = require('express');
const router = express.Router();

const app = express();

const playerRoutes = require('./routes/playerRoutes');
app.use('/api/player', playerRoutes);

const teamRoutes = require('./routes/teamRoutes');
app.use('/api/team', teamRoutes);

const gameRoutes = require('./routes/gameRoutes');
app.use('/api/game', gameRoutes);


// Middleware and other configurations
const cors = require('cors');
const path = require('path');
app.use(express.json()); // JSON request body parsing
app.use(cors());

const port = process.env.port || 80;

// Enable CORS for all routes

console.log('Server starting...')
console.log(path.join(__dirname, 'public', 'index.html'))

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/sbadmin', express.static('sbadmin'));
app.use('/images', express.static('images'));
app.set('view engine', 'ejs');


//This is to handle any page with one route, e.g., team, player, game, etc.
app.get('/pages/:pageName', (req, res) => {
    const pageName = req.params.pageName;
    //res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
    res.render(pageName);
  });

app.get('/teamx', (req, res) => {
    console.log('/team page')    
    res.setHeader('Content-Type', 'application/json'); // Set the Content-Type
    res.render('team', { pageTitle: 'Team',
        body: 'This is the main content of the  Team page.', 
    });
  });



// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy' });
  });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log('Testing...')
});
