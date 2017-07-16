// Require with the public beta key
var giphy = require('giphy-api')();
var http = require('http');
var fs = require('fs');
var dots = require("dot").process({ path: "./templates"});

process.on(
  'uncaughtException',
  (err) => {
    console.error('bad bad stuff, unhandled ... ', err);
  }
);


var giphylink = 'http://media2.giphy.com/media/FiGiRei2ICzzG/200w.gif';
function getRandomGif() {
  try {
    giphy.random(
      {
        // tag: 'superman',
        rating: 'g',
        fmt: 'json'
      },
      function (err, res) {
        if (err) {
          console.error(err);
          return;
        } else {
          // console.log(res);
        }
        giphylink = res.data.image_original_url;
        console.log(new Date() + ' > new giphy: ', giphylink);
      }
    );
  } catch(err) {
    console.error(err);

  }
};
setInterval(getRandomGif, 10000);

http.createServer(
  function (req, res) {
    var indexHtml = dots.index(
      {
        // hellotext: 'just a random gif every 12 seconds.',
        giphylink: giphylink,
        tnxgiphy: 'powered by giphy.com'
      }
    );
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(indexHtml);
  }
).listen(9615);
