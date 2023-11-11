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
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.set('view engine', 'ejs');

// Define a middleware that sets the CSP header with the 'self' source for scripts
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
    next();
  });

  
// Define a middleware function to set the 'Content-Type' header for JavaScript files
app.use((req, res, next) => {
    // Check if the requested URL ends with '.js' to identify JavaScript files
    if (req.url.endsWith('.js')) {
      // Set the 'Content-Type' header to 'text/javascript'
      res.setHeader('Content-Type', 'text/javascript');
    }
    // Continue to the next middleware or route handler
    next();
  });
  

//This is to handle any page with one route, e.g., team, player, game, etc.
app.get('/pages/:pageName', (req, res) => {
    const pageName = req.params.pageName;
    res.render(pageName);
  });


// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy' });
  });




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log('Testing...')
});
