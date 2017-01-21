var http = require('http'),
    httpProxy = require('http-proxy'),
    HttpProxyRules = require('http-proxy-rules');

//set up proxys for each domainmaking sure they are on a different port

//domain1 on port 8001
var domain1 = new httpProxy.createProxyServer({
        target: {
            host: 'localhost',
            port: 8001
        }
    });

//domain2 on port 8002
var domain2 = new httpProxy.createProxyServer({
        target: {
            host: 'localhost',
            port: 8002
        }
    });

//subdomain on port 8003
var subdomain = new httpProxy.createProxyServer({
    target: {
      host: 'localhost',
      port: 8003
    }
  });*/

//route to each proxy depending on http request
http.createServer(function(req, res) {
        if (req.headers.host === 'domain1.com') {
            domain1.proxyRequest(req, res);
            domain1.on('error', function(err, req, res) {
                if (err) console.log(err);
                res.writeHead(500);
                res.end('Oops, something went very wrong...');
            });
        } else if (req.headers.host === 'domain2.com') {
            domain2.proxyRequest(req, res);
            domain2.on('error', function(err, req, res) {
                if (err) console.log(err);
                res.writeHead(500);
                res.end('Oops, something went very wrong...');
            });
        } else if (req.headers.host === 'sub.domain1.com') {
          subdomain.proxyRequest(req, res);
          subdomain.on('error', function(err, req, res) {
              if (err) console.log(err);
              res.writeHead(500);
              res.end('Oops, something went very wrong...');
          });
        }
    }).listen(80);

//to start all at once require start scripts, remove if starting as individual tasks
require('./domain1/bin/www');
require('./domain2/bin/www');
require('./sub/bin/www');
