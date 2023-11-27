// Import the module you want to test (replace './my-module' with the correct path)
const myModule = require('./dbTeam');

// Array of function names you want to run
const functionsToRun = ['get_all_teams'];

// Iterate through the array of function names
functionsToRun.forEach((functionName) => {
  // Check if the function exists in the module's exports
  if (myModule.hasOwnProperty(functionName) && typeof myModule[functionName] === 'function') {
    console.log(`Running ${functionName}...`);

    // Call the function and handle errors
    try {
      const result = myModule[functionName](this); // Call the function
      console.log(`Result of ${functionName}:`, result);
    } catch (error) {
      console.error(`Error in ${functionName}:`, error.message);
    }
  } else {
    console.warn(`Function ${functionName} not found in module.`);
  }
});
