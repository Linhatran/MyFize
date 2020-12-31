const database = require('../models/userModel');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const bcryptController = {};

//Hash the password and store username, hash
bcryptController.createPassword = (request, response, next) => {
  const { password, username } = request.body;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      return next(err);
    }
    response.locals.credentials = { username: username, hash: hash }
    return next();
  });
};

//checks password input against the database and returns a boolean
bcryptController.checkPassword = (req, res, next) => {
  const { username, password } = req.body;
  const values = [username];
  const query = 'SELECT * FROM Users WHERE username = $1';
  database.query(query, values, (err, response) => {
    if (err) {
      return next(err);
    } else {
      let user = response.rows[0]
      bcrypt.compare(password, user.hash, function (err, check) {
        if (!check) return next("Incorrect password!");
        res.locals.result = { id: user._id, username: user.username }
        return next();
      });
    }
  });
};

//Stores encrypted password with username in db.
bcryptController.storeUserCredentials = (req, res, next) => {
  const { username, hash } = res.locals.credentials;
  const values = [username, hash]
  const query = 'INSERT INTO Users(username, hash) VALUES($1, $2)';
  database.query(query, values, (err, res) => {
    if (err) {
      return next(err);
    } else {
      return next();
    }
  });
};

module.exports = bcryptController;
