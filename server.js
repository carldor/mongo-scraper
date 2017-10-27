var express = require("express");
var bodyParser = require("body-parser");
//var logger = require("morgan");
var mongoose = require("mongoose");

var Note = require("./models/Notes.js");
var Article = require("./models/Articles.js");

var request = require("request");
var cheerio = require("cheerio");

var app = express();
var PORT = process.env.PORT || 3000;

mongoose.Promise = Promise;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/scrapperdb");
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

require("./routing/apiRoutes")(app);

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
});