const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const port = process.env.PORT
const issuer=process.env.ISSUER

const checkJwt = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: issuer + '/.well-known/jwks.json'
    }),
    audience: 'https://localhost:3000',
    issuer: issuer,
    algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:all' ]);

// This route doesn't need authentication
app.get('/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    })
  })
  
  // This route needs authentication
  app.get('/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    })
  })
  
  app.get('/private-scoped', checkJwt, checkScopes, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
    })
  })
  
  app.listen(port)
  console.log('listening on port ' + port + '...')
