const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the databse. Exiting now...', err);
  process.exit();
});

app.get('/', (req, res) => {
  res.json({
    "message": "Welcome to app"
  })
});

require('./app/routes/note.routes.js')(app);

const port = process.env.PORT;
app.listen(port, function(err) {
  if (err) throw err
  console.log(`Server is listening on port ${port}`);
  // console.log("Server is listening");
});
