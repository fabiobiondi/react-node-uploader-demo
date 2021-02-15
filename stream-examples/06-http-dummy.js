// Node.js standard http library takes advantage of streams.
// The body of an incoming request sent from a client to a web server is a Readable stream.
// The response object for that request is a Writable stream that allows the server to send a response body back to the client.

// Let's use this ideas to create a super simple HTTP server that we can use to "observe" some HTTP traffic

import { createServer } from 'http'

const server = createServer((req, res) => {
  // req is the stream representing the body of the incoming request
  // res is the stream that allows us to write a response body back to the client

  // let's print all the headers received
  console.log('\n\n', req.headers)

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
//    curl -XPOST -F 'red-dot=@sample-files/red.gif' http://localhost:8000
//
//    curl -XPOST -F 'blue-dot=@sample-files/blue.gif' http://localhost:8000
//
//    curl -XPOST -F 'green-dot=@sample-files/green.gif' http://localhost:8000
//
//    curl -XPOST -F 'avatar=@sample-files/profile.gif' http://localhost:8000
//
//
// You can even send multiple files and fields at the same time:
//
//
//    curl -XPOST -F name=luciano -F avatar=@sample-files/profile.gif -F favourite_color=@sample-files/blue.gif http://localhost:8000
//
// If you look at the logs of the web server now, you can learn a lot about how the multipart/form-data protocol works.
//
// If you are curius to find out more, you can always take a look at the official spec: https://tools.ietf.org/html/rfc7578
