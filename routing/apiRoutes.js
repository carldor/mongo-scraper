var path = require("path");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {

    app.get("/tables", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/tables.html"));
    });

    app.get("/scrape", function(req, res) {
        // Make a request for the news section of ycombinator
        request(path.join(__dirname, "/../public/news/news.html"), function(error, response, html) {

            res.sendFile(path.join(__dirname, "/../public/news/news.html"));
            console.log(path.join(__dirname, "/../public/news/news.html"));
            console.log("login hmtl");
            console.log(html);

          // Load the html body from request into cheerio
          var $ = cheerio.load(html);

          // For each element with a "title" class
          $(".article").each(function(i, element) {

            var result = {};

            // Save the text and href of each link enclosed in the current element
            result.title = $(element).children("title").text();
            result.link = $(element).children("a").attr("href");
            result.summary = $(element).children("p").text();

            var entry = new Article(result);

            entry.save(function(err, doc) {
                // Log any errors
                if (err) {
                  console.log(err);
                }
                // Or log the doc
                else {
                  console.log(doc);
                }
              });
      
            // If this found element had both a title and a link
            if (title && link && summary) {
              // Insert the data in the scrapedData db
              db.scrapperdb.insert({
                title: title,
                link: link,
                summary:summary
              },
              function(err, inserted) {
                if (err) {
                  // Log the error if one is encountered during the query
                  console.log(err);
                }
                else {
                  // Otherwise, log the inserted data
                  console.log(inserted);
                }
              });
            }
          });
        });
      
        // Send a "Scrape Complete" message to the browser
        res.send("Scrape Complete");
      });

};