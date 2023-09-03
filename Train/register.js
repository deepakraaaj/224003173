const axios = require('axios');

// Define the John Doe Railway Server API base URL.
const API_BASE_URL = 'http://20.244.56.144/train';

// Company details for registration.
const companyDetails = {
  companyName: 'Train Central',
  ownerName: 'Deepakraj',
  rollNo: '224003173',
  ownerEmail: '224003173@sastra.ac.in',
  accessCode: 'XGgVsc',
};

// Function to register the company and save credentials.
async function registerCompany() {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, companyDetails);
    const { clientID, clientSecret } = response.data;

    // Save clientID and clientSecret securely, e.g., in a database or environment variables.
    // This example just logs them for demonstration purposes.
    console.log('Registered successfully:');
    console.log('Client ID:', clientID);
    console.log('Client Secret:', clientSecret);
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
}

// Call the registration function.
registerCompany();
