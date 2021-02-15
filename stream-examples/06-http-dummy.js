// Node.js standard http library takes advantage of streams.
// The body of an incoming request sent from a client to a web server is a Readable stream.
// The response object for that request is a Writable stream that allows the server to send a response body back to the client.

// Let's use this ideas to create a super simple HTTP server that we can use to "observe" some HTTP traffic

import { createServer } from 'http'

const server = createServer((req, res) => {
  // req is the stream representing the body of the incoming request
  // res is the stream that allows us to write a response body back to the client

  // let's print on the standard output all the data that is coming from the request
  req.pipe(process.stdout)
  // when all the data has been printed let's reply to the client and close the response stream
  req.on('end', () => {
    res.writeHead(200)
    res.end('OK, bye!\n')
  })
})

server.listen(8000, () => console.log('Server started at http://localhost:8000'))

// now start the server with `node 06-http-dummy.js` and, in another terminal, try sending it some files with `curl`, for example:
//
// curl -F 'red-dot=@sample-files/red.gif' http://localhost:8000
