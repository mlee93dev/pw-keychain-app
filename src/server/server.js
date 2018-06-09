const express = require('express');
const path = require('path');
const app = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + './client/dist/index.html'));
});

app.use(forceSSL());

app.use(express.static(__dirname + './client/dist'));

app.listen(process.env.PORT || 8080);