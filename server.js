var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    app = express(),
    MongoClient = mongodb.MongoClient,
    url = 'mongodb://localhost:/test';


var Question = require('./models/newQuestion.js');
app.use(express.static(__dirname + '/public'));

// Create our Express-powered HTTP server
http.createServer(app).listen(3000);
console.log('Running on port 3000');

mongoose.Promise = global.Promise;
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// Home Page
app.get('/', function(req, res) {
    res.render('index');
});

// Posting new question
app.post('/question', function(req, res) {
    var question = JSON.stringify(req.body.newQuestion);
    var answer = JSON.stringify(req.body.answer);
    var triviaQuestion = new Question({
        question: question,
        answer: answer
    });
    // Connect to database
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to database');

            // Get the documents collection
            var collection = db.collection('trivia');

            // Insert new question into database
            triviaQuestion.save(function(err){
              if(err) {
                console.log(err);
              }
              else {
                console.log('Inserted new question into database');
              }
            });
        }
        // CLose connection after inserting new trivia question
        db.close();
    });
});

/*
app.get('/question', function(req, res) {
  var resultArray = [];

  mongo.connect(url, function(err,db){
    assert.equal(null, err);
    var cursor = db.collection('new-question').find();
    cursor.forEach(function(doc, err){
      asser.equals(null, err);
      resultArray.push(doc);
    });
  });

});

app.post('/answer', function(req, res) {

});

app.get('/score', function(req, res) {

});
*/
