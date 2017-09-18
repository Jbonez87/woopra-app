const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      config = require('dotenv').config(),
      Photo = require('./models/photo').Photo;
      // index = Photo.index();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect to our database
mongoose.connect('mongodb://localhost:27017/jsonplaceholder', {
  useMongoClient: true
});

const defaultRegexSearch = {
  title: true,
}

const allowedSearchables = {
  title: true,
}

const db = mongoose.connection;
// console.log(db);

const messageQuery = (query) => {
  // console.log(query)
  let regefied = '', newQuery = {}
  Object.keys(query).forEach(key => {
    console.log(query, key)
    if(defaultRegexSearch.hasOwnProperty(key)){
      regefied = new RegExp(query[key], 'i')
      newQuery[key] = regefied
    }
    else if(allowedSearchables.hasOwnProperty(key)){
      newQuery[key] = query[key]
    }
  })
  return newQuery
}

app.get('/', (req, res) => {
  res.send('api working!');
});

// gets all photos, stores them in a results array and paginates them
app.get('/api/photos', (req, res, next) => {
  let pageOptions = {
    page: req.query.page || 0,
    limit: req.query.limit || 50
  }
  console.log(req.query.params);
  let response = {results: []}
  Photo.find(
    messageQuery(req.query), (err, mongoRes) => {
    if(err){
      console.error(err)
      response.results.push(err)
    }
    else{
      response.results = mongoRes
    }
    res.json(response)
  })
  .skip(pageOptions.page * pageOptions.limit)
  .limit(parseInt(pageOptions.limit))
});

// app.get("/api/photos/:title", function(req, res, next) {
//   let response = {results: []};
//   let pageOptions = {
//     page: req.query.page || 0,
//     limit: req.query.limit || 50
//   };
//   console.log(req.params.title);
//   Photo.find(
//     messageQuery(
//       {
//         "$text": { $search: req.params.title },
//         "score": {$meta: 'textScore'}
//       }),
//       (err, mongoRes) => {
//         if (err) {
//           console.error(err);
//           response.results.push(err);
//         }
//       }
//     )
//     .skip(pageOptions.page * pageOptions.limit)
//     .limit(parseInt(pageOptions.limit))
// });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
