// Get active drivers list
fetch('/api/drivers')
  .then(response => response.json())
  .then(drivers => {
    const activeDriversList = document.getElementById('active-drivers');
    drivers.forEach(driver => {
      const driverListItem = document.createElement('li');
      driverListItem.textContent = `${driver.name} - ${driver.location}`;
      activeDriversList.appendChild(driverListItem);
    });
  });

// Book a ride form submission
document.getElementById('book-a-ride').addEventListener('submit', event => {
  event.preventDefault();
  const pickupLocation = document.getElementById('pickup-location').value;
  const dropoffLocation = document.getElementById('dropoff-location').value;
  const driverId = document.getElementById('driver-select').value;
  fetch('/api/book-ride', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pickupLocation, dropoffLocation, driverId })
  })
  .then(response => response.json())
  .then(booking => {
    console.log(booking);
  });
});


Server-side code (Node.js and Express.js)
const express = require('express');
const app = express();
const port = 3000;

// Active drivers list
const drivers = [
  { id: 1, name: 'Roy kuchombo', location: 'Blantyre' },
  { id: 2, name: 'trust osman', location: 'Lilongwe' }
];

// Book a ride API endpoint
app.post('/api/book-ride', (req, res) => {
  const { pickupLocation, dropoffLocation, driverId } = req.body;
  // Send passenger location to driver's email or WhatsApp number
  // ...
  res.json({ message: 'Ride booked successfully' });
});

// Active drivers API endpoint
app.get('/api/drivers', (req, res) => {
  res.json(drivers);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
