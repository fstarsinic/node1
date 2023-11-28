const axios = require('axios');
const fs = require('fs');

// Specify the file containing URLs
const URL_FILE = 'curl_list';

// Read URLs from the file
//const urls = fs.readFileSync(URL_FILE, 'utf-8').split('\n').map(url => url.trim());

// Read URLs from the file and filter out blank lines
const urls = fs
  .readFileSync(URL_FILE, 'utf-8')
  .split('\n')
  .map((url) => url.trim())
  .filter((url) => url !== ''); // Filter out empty lines

// Function to test URLs
async function testUrls() {
  for (const url of urls) {
    console.log(`Testing URL: ${url}`);
    try {
      const response = await axios.get(url);
      console.log(`Response status: ${response.status}`);
      console.log(`Response data:`);
      console.log(response.data);
    } catch (error) {
      console.error(`FAIL: Failed to fetch URL: ${error.message}`);
    }
    console.log('-------------------------------------');
  }
}

// Call the function to test URLs
testUrls();

