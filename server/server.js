const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

//my mongoLab URI
const MONGO_URI = 'mongodb://helio:test1234@ds061474.mlab.com:61474/lyricaldb';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}


mongoose.Promise = global.Promise;

//NEW MONGOOSE STYLE
async function run() {
  // With `useMongoClient`, `mongoose.connect()` returns a thenable


  await mongoose.connect(MONGO_URI, {useNewUrlParser: true });


  // const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
  // const doc = await Test.create({ name: 'Val' });
  // console.log(doc);
}

run().catch(error => console.error(error.stack));
//END OF NEW STYLE

// var promise = mongoose.connect('mongodb://lanamonson.slc:lanamonson27@ds061474.mlab.com:61474/lyricaldb', {
//   useMongoClient: true,
//   /* other options */
// });
// mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_URI);
// mongoose.connection
//     .once('useMongoClient', () => console.log('Connected to MongoLab instance.'))
//     .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;