var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    app = express(),
    MongoClient = mongodb.MongoClient;

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

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to Database");
});


var answerID = 0;

// Home Page
app.get('/', function(req, res) {
    res.render('index');
});

// Posting new question
app.post('/question', function(req, res) {
    answerID = answerID + 1;
    var collection = db.collection('questions');
    var triviaQuestion = {
        question: req.body.newQuestion,
        answer: req.body.answer,
        answer_id: answerID
    };

    collection.insert([triviaQuestion], function(err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Entered new question into db');
        }
    });
});

/*
app.get('/question', function(req, res) {
    var resultArray = [];
    var cursor = db.collection('questions').find();
    cursor.forEach(function(doc, err) {
        resultArray.push();
    });
    res.json(resultArray);
    console.log(resultArray);
    Question.find({}, function(err, questions) {
        var excuseMap = {};
        questions.forEach(function(question) {
            excuseMap[excuse._id] = excuse;
        });
        res.json(excuseMap);
        console.log(excuseMap);
    });
});
*/

/*
app.post('/answer', function(req, res) {

});

app.get('/score', function(req, res) {

});
*/
