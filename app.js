const express = require('express');
const app = express();
const PORT = 3000; 

// Middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();

  // Check if it's a weekday (Monday to Friday) and time is between 9 to 17
  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); // Continue with the next middleware or route handler
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Use the middleware for all routes
app.use(workingHoursMiddleware);

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

// Serve static files (CSS)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
