const db = require('./dbPlayer'); // Replace with the actual path to your database module

async function testGetPlayerByName(firstname, lastname) {
  try {
    if (!firstname || !lastname) {
      console.log('Please provide both first name and last name.');
      return;
    }

    const player = await db.get_player_by_name(firstname, lastname);

    if (player.length > 0) {
      console.log('Player found:');
      console.log(player);
    } else {
      console.log('Player not found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Get the command-line arguments for firstname and lastname
const [nodePath, scriptPath, firstname, lastname] = process.argv;

// Call the testing function with command-line arguments
testGetPlayerByName(firstname, lastname);
