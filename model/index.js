const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db ={};

db.mongoose = mongoose;
db.url = process.env.MONGO_URL;
db.books = require('./book.model.js');
db.bookCategories = require('./bookCategory.model.js');

module.exports = db;