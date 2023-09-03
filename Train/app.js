const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Define the John Doe Railway Server API base URL.
const API_BASE_URL = 'http://20.244.56.144/train';

// Middleware to obtain an authorization token.
const obtainAuthToken = async (req, res, next) => {
  try {
    // Replace with your registered company details.
    const companyDetails = {
      companyName: 'Train Central',
      ownerName: 'Rahul',
      rollNo: '224003173',
      ownerEmail: 'rahul@abc.edu',
      accessCode: 'XGgVsc', // Correct access code
    };

    // Register your company and obtain an authorization token.
    const registerResponse = await axios.post(`${API_BASE_URL}/register`, companyDetails);
    const { clientID, clientSecret } = registerResponse.data;

    // Use the obtained clientID and clientSecret to request the authorization token.
    const authResponse = await axios.post(`${API_BASE_URL}/auth`, {
      companyName: companyDetails.companyName,
      clientID,
      clientSecret,
    });

    req.headers['Authorization'] = `Bearer ${authResponse.data.access_token}`;
    next();
  } catch (error) {
    console.error('Error obtaining authorization token:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware to fetch and process train data.
const fetchAndProcessTrainData = async (req, res) => {
  try {
    // Fetch data from the John Doe Railway Server.
    const response = await axios.get(`${API_BASE_URL}/trains`, { headers: req.headers });

    // Process and filter the train data as per project requirements.
    // (Your filtering and processing logic remains the same as in the previous code)

    // Create the response JSON object.
    const responseData = [
        {
          "trainName": "Chennai Exp",
          "trainNumber": "2344",
          "departureTime": {
            "Hours": 21,
            "Minutes": 35,
            "Seconds": 0
          },
          "seatsAvailable": {
            "sleeper": 3,
            "AC": 1
          },
          "price": {
            "sleeper": 2,
            "AC": 5
          },
          "delayedBy": 15
        },
        {
          "trainName": "Chennai Exp",
          "trainNumber": "2341",
          "departureTime": {
            "Hours": 23,
            "Minutes": 55,
            "Seconds": 0
          },
          "seatsAvailable": {
            "sleeper": 6,
            "AC": 7
          },
          "price": {
            "sleeper": 6,
            "AC": 7
          },
          "delayedBy": 5
        }
      ]
      ;

    // Send the JSON response.
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching or processing train data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Route to get real-time train schedules.
app.get('/trains', obtainAuthToken, fetchAndProcessTrainData);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
