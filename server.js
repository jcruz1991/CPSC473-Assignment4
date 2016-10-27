var express = require('express'),
    assert = require('assert'),
    http = require('http'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb'),
    mongoose = require('mongoose'),
    cons = require('consolidate'),
    path = require('path'),
    app = express(),
    url = 'mongodb://localhost:27017/test';


var Question = require('./models/newQuestion.js');
app.use(express.static(__dirname + '/public'));

// Create our Express-powered HTTP server
http.createServer(app).listen(3000);
console.log('Running on port 3000');

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB Database");
});

// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/question', function(req, res) {
  var resultArray = [];
/*
  mongo.connect(url, function(err,db){
    assert.equal(null, err);
    var cursor = db.collection('new-question').find();
    cursor.forEach(function(doc, err){
      asser.equals(null, err);
      resultArray.push(doc);
    });
  });
  */
});

app.post('/question', function(req, res) {
  var question = new Question();
  question.question = req.body.newQuestion;
  question.answer = req.body.answer;

  question.save(function(err, savedQuestion) {
  if (err) {
    console.log(err);
    return res.status(500).send();
  }
  app.render('index');
  return res.status(200).send();
  });
});

/*
app.post('/answer', function(req, res) {

});

app.get('/score', function(req, res) {

});
*/
