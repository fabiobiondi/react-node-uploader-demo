// streams allow us to process indefinite amounts of data in a "streaming fashion".
// That means that you can handle chunks of data as they arrive.
// Evey chunk is represented by a buffer and therefore you can imagine a stream as
// a sequence of buffers arriving over time.

import { createReadStream } from 'fs'
import { join } from 'desm'

// createReadStream creates a "readable" stream from a file
const readFileStream = createReadStream(join(import.meta.url, 'the-matrix.mp4'))
let numChunks = 0
let totalBytes = 0

// stream objects expose an event-based api
readFileStream
  // when a new "chunk" has arrived
  .on('data', (chunk) => {
    console.log(chunk)
    numChunks++
    totalBytes += chunk.length
  })
  // the file has been fully streamed
  .on('end', () => {
    console.log(`Read ${totalBytes} bytes in ${numChunks} chunks`)
  })
  // in case there is an error, we can handle it
  .on('error', (err) => {
    console.log(`Whoops... ${err}`)
    readFileStream.destroy()
  })

// Again, this was a "readable" stream: it allows us to read data from a source
