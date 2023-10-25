const express = require('express');
const db = require('./public/db')

const app = express();
const path = require('path');
const port = 3000;

console.log('doing something')
console.log(path.join(__dirname, 'public', 'index.html'))
console.log('doing something else')

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));


app.get('/hichart', (req, res) => {
    console.log('Server got index request')
    //res.send('got index request')
    console.log(path.join(__dirname, 'public', 'hichart.html'))
    res.sendFile(path.join(__dirname, 'public', 'hichart.html'));
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
    console.log('/multi_data()')
    var num = req.query.num;
    if (typeof num == 'undefined'){
        num = 10
    }
    console.log(`Querystring num: ${num}`)
    const numcheck = parseInt(num);
    if (isNaN(num)){
        res.send('Querystring value must be an integer')
    }
    else{
        db.get_top_multi(num, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json(rows);
          });      
    }
  });
  

// Define an endpoint that displays "Hello World"
app.get('/hello', (req, res) => {
    console.log('Testing hello world...')
    res.send('Hello World');
  });
  
  


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    console.log('Testing...')
});
