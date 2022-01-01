const express = require('express');

const fs = require('fs');
const app = express();
app.use(express.json());

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  let tour = tours.find((el) => el.id === id);
  if (!tour || id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID or tour not found with that ID',
    });
  } else {
    tours.splice(id, 1);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};
// get all tours
app.get('/api/v1/tours', getAllTours);

// get a single tour

app.get('/api/v1/tours/:id', getTour);

// post a new tour
app.post('/api/v1/tours', createTour);

// update a tour
app.patch('/api/v1/tours/:id', updateTour);

// delete a tour
app.delete('/api/v1/tours/:id', deleteTour);


const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
