// Readable and writable streams can be "piped" (connected) together to create streaming data pipelines

// For instance, let's copy a file from one place to another

import { createReadStream, createWriteStream } from 'fs'
import { join } from 'desm'

const sourcePath = join(import.meta.url, 'the-matrix.mp4')
const destPath = join(import.meta.url, 'the-matrix-copy.mp4')
// creates the source stream (a readable)
const sourceStream = createReadStream(sourcePath)
// creates the destination stream (a writable)
const destStream = createWriteStream(destPath)

// piping 2 streams creates a new stream
// the data from the source stream will start to flow into the destination stream
const copyStream = sourceStream.pipe(destStream)

// we can use events to observe the status of the stream
copyStream
  .on('finish', () => console.log(`File copied from "${sourcePath}" to "${destPath}"`))
  .on('error', (err) => console.log(`Whoops... ${err}`))
