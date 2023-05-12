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
    // Make a request to the NASA API
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: process.env.NASA_API_KEY,
        count: 1,
      },
    });

    const picture = response.data[0];

    res.render('home', { picture: picture }); // Pass the picture object to the EJS file
  } catch (error) {
    console.error('Error fetching picture:', error);
    res.status(500).send('Failed to fetch picture');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
