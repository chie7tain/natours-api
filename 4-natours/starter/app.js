const express = require('express');

const fs = require('fs');
const app = express();
app.use(express.json());

let tours = JSON.parse(
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

// get a single tour

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour || id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID or tour not found with that ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
});

// post a new tour
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// update a tour
app.patch('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  let tour = tours.find((el) => el.id === id);
  if (!tour || id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID or tour not found with that ID',
    });
  } else {
    tours[id] = { ...tour, ...req.body };
    res.status(200).json({
      status: 'success',
      data: {
        tours,
      },
    });
  }
});
app.delete("")
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
