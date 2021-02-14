// streams allow us to process indefinite amounts of data in a "streaming fashion".
// That means that you can handle chunks of data as they arrive.
// Evey chunk is represented by a buffer and therefore you can imagine a stream as
// a sequence of buffers arriving over time.

import { createReadStream } from 'fs'
import { join } from 'desm'

// createReadStream creates a "readable" stream from a file
const fileStream = createReadStream(join(import.meta.url, 'the-matrix.mp4'))
let numChunks = 0
let totalBytes = 0

// stream objects expose an event-based api
fileStream
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
  // there was an error
  .on('error', (err) => console.log(`Whoops... ${err}`))
