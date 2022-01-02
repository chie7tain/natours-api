const express = require('express');

const userRouter = express.Router();

const getAllUsers = (req, res) => {
  res.send({
    message: 'not built yet',
  });
};
const getUser = (req, res) => {
  res.send({
    message: 'not built yet',
  });
};
const createUser = (req, res) => {
  res.send({
    message: 'not built yet',
  });
};
const updateUser = (req, res) => {
  res.send({
    message: 'not built yet',
  });
};
const deleteUser = (req, res) => {
  res.send({
    message: 'not built yet',
  });
};
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
