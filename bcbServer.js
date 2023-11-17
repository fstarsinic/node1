const express = require('express');
const app = express();
const fs = require('fs');


const router = express.Router();

// Middleware and other configurations
app.use(express.json()); // JSON request body parsing

const cors = require('cors');
app.use(cors());

const path = require('path');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Define a middleware that sets the CSP header with the 'self' source for scripts
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
  next();
});


// Define a middleware function to set the 'Content-Type' header for JavaScript files
app.use((req, res, next) => {
  // Check if the requested URL ends with '.js' to identify JavaScript files
  if (req.url.endsWith('.js')) {
    console.log(`Setting content type for ${req.url} to text/javascript`);
    // Set the 'Content-Type' header to 'text/javascript'
    res.setHeader('Content-Type', 'text/javascript');
  }
  // Continue to the next middleware or route handler
  next();
});




const playerRoutes = require('./routes/playerRoutes');
app.use('/api/player', playerRoutes);

const teamRoutes = require('./routes/teamRoutes');
app.use('/api/team', teamRoutes);

const gameRoutes = require('./routes/gameRoutes');
app.use('/api/game', gameRoutes);

const fileUploadRoutes = require('./routes/fileUploadRoutes');
app.use('/api/upload', fileUploadRoutes);


const port = process.env.port || 80;

console.log('Server starting...')
console.log(path.join(__dirname, 'public', 'index.html'))

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/sbadmin', express.static('sbadmin'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.set('view engine', 'ejs');



//This is to handle any page with one route, e.g., team, player, game, etc.
app.get('/pages/:pageName', (req, res) => {
    const pageName = req.params.pageName;
    res.render(pageName);
  });


// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy' });
  });


app.get('/check-cors', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Set the allowed origin here
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed
  res.send('CORS headers are set correctly.');
});

app.get('/dir', (req, res) => {
  // Read the contents of a directory (e.g., 'public') using fs.readdir
  const directoryPath = './uploads'; // Replace with your directory path
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading directory');
    } else {
      console.log(files);
      // Render the EJS template with the directory contents
      res.render('listDirectory', { files });
    }
  });
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log('Testing...')
});
