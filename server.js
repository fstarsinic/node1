const express = require('express');
const db = require('./modules/db')
const bus = require('./modules/bus')
const DataTable = require('datatables');
const app = express();
const path = require('path');
const port = process.env.port || 80;

console.log('doing something')
console.log(path.join(__dirname, 'public', 'index.html'))
console.log('doing something else')

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/sbadmin', express.static('sbadmin'));
app.set('view engine', 'ejs');


app.get('/dashboard', (req, res) => {
    const numValue = req.query.num ? req.query.num : 10;

    res.render('dashboard', { pageTitle: 'Dashboard',
        body: 'This is the main content of the dashboard page.', 
        num: numValue,
    });
  });
  

  app.get('/players', (req, res) => {
    console.log('/players page')
    res.render('players', { pageTitle: 'Players',
        body: 'This is the main content of the Players page.', 
    });
  });
  
  app.get('/player', (req, res) => {
    console.log('/player page')
    res.render('player', { pageTitle: 'Player',
        body: 'This is the main content of the Individual Player page.', 
    });
  });
  

  app.get('/hichart', (req, res) => {
    console.log('Server got index request')
    //res.send('got index request')
    console.log(path.join(__dirname, 'public', 'hichart.html'))
    res.sendFile(path.join(__dirname, 'public', 'hichart.html'));
  });
  
// Define a route to fetch data from the database
app.get('/api/players', (req, res) => {
    console.log('/api/players endpoint')
        db.get_player_data((err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
  });

// Define a route to fetch data from the database
app.get('/api/teamgames', (req, res) => {
  console.log('/api/teamgames endpoint')
  const numValue = req.query.num ? req.query.num : 7;
  console.log(`num ${numValue}`)
      bus.get_team_game_data(numValue, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json(rows);
        });      
});


// Define a route to fetch data from the database
app.get('/api/points', (req, res) => {
    console.log('/points_per_game_data()')
    var num = req.query.num;
    if (typeof num == 'undefined'){
        num = 10
    }

    const numcheck = parseInt(num);
    if (isNaN(num)){
        res.send('Querystring value must be an integer')
    }
    else{
        db.get_top_ppg(num, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
    }
  });

// Define a route to fetch data from the database
app.get('/api/turnovers', (req, res) => {
    console.log('/turnover_data()')
    var num = req.query.num;
    if (typeof num == 'undefined'){
        num = 10
    }

    const numcheck = parseInt(num);
    if (isNaN(num)){
        res.send('Querystring value must be an integer')
    }
    else{
        db.get_top_turnovers(num, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
    }
  });
  
// Define a route to fetch data from the database
app.get('/api/rebounds', (req, res) => {
    console.log('/rebounds_data()')
    var num = req.query.num;
    if (typeof num == 'undefined'){
        num = 10
    }

    const numcheck = parseInt(num);
    if (isNaN(num)){
        res.send('Querystring value must be an integer')
    }
    else{
        db.get_top_rebounds(num, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
    }
  });

// Define a route to fetch data from the database
app.get('/api/summary', (req, res) => {
    console.log('/summary()')

        db.get_multi((err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
  });
  

// Define an endpoint that displays "Hello World"
app.get('/', (req, res) => {
    console.log('Testing hello world...')
    res.send('Hello World');
  });
  
  


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    console.log('Testing...')
});
