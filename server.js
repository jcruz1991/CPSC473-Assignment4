var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    app = express(),
    MongoClient = mongodb.MongoClient;


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

// Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to Database");
});

// Home Page
app.get('/', function(req, res) {
    res.render('index');
});

// Posting new question
app.post('/question', function(req, res) {
    var triviaQuestion = new Question();
    triviaQuestion.question = req.body.newQuestion;
    triviaQuestion.answer = req.body.answer;

    console.log("Posting new trivia question");

    triviaQuestion.save(function(err, savedQuestion) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send();
    });
});


app.get('/question', function(req, res) {
  /*
    var resultArray = [];
    var cursor = db.collection('questions').find();
    cursor.forEach(function(doc, err) {
        resultArray.push();
    });
    res.json(resultArray);
    console.log(resultArray);

*/
    Question.find({}, function(err, questions) {
        var excuseMap = {};
        questions.forEach(function(question) {
            excuseMap[excuse._id] = excuse;
        });
        res.json(excuseMap);
        console.log(excuseMap);
    });
});

/*
app.post('/answer', function(req, res) {

});

app.get('/score', function(req, res) {

});
*/
