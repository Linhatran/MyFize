const express = require('express');
const router = express.Router();
const bcryptController = require('../controllers/bcryptController.js');

router.post(
  '/create_pw',
  bcryptController.createPassword,
  bcryptController.storeUserCredentials,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  }
);

<<<<<<< HEAD
=======
router.post('/create_pw', bcryptController.createPassword, bcryptController.storeUserCredentials, (req, res) => {
  return res.status(200).send();
});

>>>>>>> b927223d643cfaed45391dbce0f323289a21344d
router.post('/check_pw', bcryptController.checkPassword, (req, res) => {
  return res.status(200).send(res.locals.result);
});

module.exports = router;
