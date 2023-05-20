import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Route for the home page
app.get('/', async (req, res) => {
  try {
    // Makes a get request to the NASA RESTful API
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: process.env.NASA_API_KEY,
        count: 1,
      },
    });

    const picture = response.data[0];

    // Pass the picture object to the EJS file
    res.render('home', { picture: picture });

  } catch (error) {
    console.error('Error fetching picture:', error);
    res.status(500).send('Failed to fetch picture');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
