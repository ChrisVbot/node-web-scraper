
const url = process.argv[2];
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter({headers:['file permission', 'absolute url', 'file type']});


var stream = fs.createWriteStream('images.csv');
  writer.pipe(stream);
  stream.on('open', () => {
    request(url, (error, response, body) => {
      if(!error && response.statusCode == 200) {    
        $ = cheerio.load(body);
        $('tr').each(function(index, element){
          var filePermission = ($(this).children().first().text());
          var fileName = ($(this).children().last().text());
          var fileType = fileName.substr(fileName.indexOf(".") + 1);
          if (fileType.length !== 3){
            fileType = "directory";
          }
          var absoluteURL = (url + fileName);
          //still in the each loop - writes each result to the csv file in a stream. Formatted by csvWriter npm.
          writer.write([filePermission, absoluteURL, fileType])
        });
      };
  stream.end();    
  });
});





