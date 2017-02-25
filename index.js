const http = require('http')
const port = process.env.PORT || 8080

const restify = require('restify');

const respond = (request, response, next) => {
  response.send('hello ' + request.params.name)
  next()
}

const server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(port, (err) => {
  if (err) {
    return console.log(`Unable to start server on port ${port}`, err)
  }

  console.log(`server is listening on ${port}`)
})
