
const url = process.argv[2];
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

var stream = fs.createWriteStream('images.csv');
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
          csvInput = (filePermission + "," + absoluteURL + "," + fileType) + "\n";
        //still in the each loop - writes each result to the csv file in a stream
        stream.write(csvInput)
        });
      };
      stream.end();    
    });
})






