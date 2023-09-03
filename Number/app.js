const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  const uniqueNumbers = new Set();

  // Define a function to fetch data from a URL and add unique numbers to the set
  const fetchAndMergeNumbers = async (url) => {
    try {
      const response = await axios.get(url, { timeout: 500 });
      if (response.status === 200 && response.data.numbers) {
        response.data.numbers.forEach((number) => {
          uniqueNumbers.add(number);
        });
      }
    } catch (error) {
      // Ignore timeouts and other errors
    }
  };

  // Fetch data from each URL concurrently
  const fetchPromises = urls.map((url) => fetchAndMergeNumbers(url));

  try {
    await Promise.all(fetchPromises);
    const sortedNumbers = [...uniqueNumbers].sort((a, b) => a - b);
    res.json({ numbers: sortedNumbers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
