const axios = require('axios');

// Define the John Doe Railway Server API base URL.
const API_BASE_URL = 'http://20.244.56.144/train';

// Replace with your saved clientID and clientSecret.
const clientID = '3ebf5627-e564-46d7-b924-e30d75b1b2f1';
const clientSecret = 'xReGLIsVQrkgMMIt';

// Company details for authentication.
const companyDetails = {
  companyName: 'Train Central',
  clientID,
  ownerName: 'Deepakraj',
  ownerEmail: '224003173@sastra.ac.in',
  rollNo: '224003173',
  clientSecret,
};

// Function to obtain an authorization token.
async function obtainAuthToken() {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, companyDetails);
    const { token_type, access_token } = response.data;

    // Save the access_token securely, e.g., in an environment variable.
    // This example just logs it for demonstration purposes.
    console.log('Authorization successful:');
    console.log('Token Type:', token_type);
    console.log('Access Token:', access_token);
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status code.
      console.error('Authorization failed with status code:', error.response.status);
      console.error('Error details:', error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received.
      console.error('No response received from the server.');
    } else {
      // Something else went wrong.
      console.error('Error:', error.message);
    }
  }
}

// Call the authorization function.
obtainAuthToken();
