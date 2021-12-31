const express = require('express');

const fs = require('fs');
const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// get all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// post a new tour
app.post('/api/v1/tours', (req, res) => {
  let newTour = req.body;
  console.log(newTour);
  res.status(201).json({
    status: 'success',
  });
});
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
