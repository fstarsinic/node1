const fs = require('fs');
const svc = require('../svc/gameService');
const { argv0 } = require('process');

// Check if a file path is provided as a command line argument
if (process.argv.length !== 3) {
  console.error('Usage: node transform.js <input.json>');
}
  //process.exit(1);

async function main() {
  rows = await svc.getAllPlayersPointsByGame(); 
  console.log(`gamesvc.rows:`);
  console.log(rows);
  const jsonData = JSON.stringify(rows);

  const jdata = transformData(jsonData);
  console.log(jdata);
  process.exit(1);
};

// Define your transformation function
function transformData(data) {
  // Implement your transformation logic here
  // Example: Doubling the values of all numbers
  const gameData = {}
  gamesObj = {}
  current_player = '';
  if (Array.isArray(data)) {
    console.log('data is array')
    data.forEach((row) => {
      const { game_id, player, points} = row;
      if (current_player != player) {
        if (current_player != '') {
          gameData[current_player] = gamesObj;
        }
        current_player = player;
        gamesObj = {};
      }
      current_player = player;
      console.log(`game_id: ${game_id}, player: ${player}, points: ${points}`)
      //console.log(row);
      gamesObj['game ' + game_id] = points;      
      //console.log(gamesObj)
    });
  };   
  return gameData;
};

console.log(`argv: ${__filename} ${process.argv[2]}`);
main();


/*
// Get the input file path from the command line arguments
const inputFilePath = process.argv[2];

// Read the JSON file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Perform your transformation here
    const transformedData = transformData(jsonData);

    // Display the transformed results
    console.log(JSON.stringify(transformedData, null, 2));
  } catch (parseError) {
    console.error(`Error parsing JSON: ${parseError.message}`);
    process.exit(1);
  }
});

// Define your transformation function
function transformData(data) {
  // Implement your transformation logic here
  // Example: Doubling the values of all numbers
  const gameData = {}
  gamesObj = {}
  current_player = '';
  if (Array.isArray(data)) {
    console.log('data is array')
    data.forEach((row) => {
      const { game_id, player, points} = row;
      if (current_player != player) {
        if (current_player != '') {
          gameData[current_player] = gamesObj;
        }
        current_player = player;
        gamesObj = {};
      }
      current_player = player;
      console.log(`game_id: ${game_id}, player: ${player}, points: ${points}`)
      //console.log(row);
      gamesObj['game ' + game_id] = points;      
      //console.log(gamesObj)
    });
  };   
  return gameData;
};
*/