const http = require('http')
const path = require('path')
const port = process.env.PORT || 8080

const restify = require('restify');

const transform = (request, response, next) => {
  var s = request.params.s;
  // Step 1: Measure existing complexity.
  // For a first pass, let's just use string length.
  const initialComplexity = s.length;

  // Step 2: Do stuff.
  // Some ideas:
  // 1. Use a thesaurus
  // 2. Translate to and back from another language
  // 3. Map of common words and phrases to more complex phrases.
  // 4. negated opposite (eg change "has" to "doesn't not have")
  // For a first pass, let's map using maps/phrases.json
  const phraseMap = require('./maps/phrases.json');
  for (var phrase in phraseMap) {
    s = s.replace(phrase, phraseMap[phrase]);
  }

  // Step 3: Ensure complexity has been increased and return value.
  const finalComplexity = s.length;

  response.send((initialComplexity < finalComplexity) ? s : request.params.s);
  next()
}

const server = restify.createServer();
server.get('/transform/:s', transform);

// serve compiled js/css/etc
server.get(/\/js\/.*/, restify.serveStatic({
  directory: path.resolve(__dirname, '../app-compiled')
}));
// root static files
server.get(/\//, restify.serveStatic({
  directory: path.resolve(__dirname, '../static'),
  default: 'index.html'
}));

server.listen(port, (err) => {
  if (err) {
    return console.log(`Unable to start server on port ${port}`, err)
  }

  console.log(`server is listening on ${port}`)
})
