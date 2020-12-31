//creates User table

// CREATE TABLE Users (
//   _id SERIAL PRIMARY KEY,
//   username TEXT,
//   hash TEXT
// );

//creates User_Accounts table

// CREATE TABLE User_Accounts(
//   _id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES Users(_id),
//   account_name TEXT,
//   account_subtype TEXT,
//   account_balance TEXT
// );

//creates User_Transactions table

// CREATE TABLE User_Transactions (
//   _id SERIAL PRIMARY KEY,
//   account_id INT REFERENCES User_Accounts(_id),
//   merchant_name TEXT,
//   amount TEXT,
//   category TEXT,
//   date_of_transaction TEXT
// );