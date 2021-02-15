// There's another type of stream called "Transform stream" which allow us to manipulate data as it flows
// through a streaming pipeline.
// Classic examples of common transformation are compression and encryption.

// Let's use this idea to compress a file while we copy it

import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'
import { join } from 'desm'

const sourcePath = join(import.meta.url, 'the-matrix.mp4')
const destPath = join(import.meta.url, 'the-matrix.mp4.gzip')
// creates the source stream (a readable)
const sourceStream = createReadStream(sourcePath)
// creates the destination stream (a writable)
const destStream = createWriteStream(destPath)
// creates the compression stream (a transform)
const compressStream = createGzip()

// Let's pipe the 3 streams together
const copyCompressStream = sourceStream
  .pipe(compressStream)
  .pipe(destStream)

copyCompressStream
  .on('finish', () => console.log(`Compressed "${sourcePath}" into "${destPath}"`))
  .on('error', (err) => console.log(`Whoops... ${err}`))

// NOTE: for better error handling, when piping multiple streams together it's better to use
// the `stream.pipeline()` utility (https://nodejs.org/api/stream.html#stream_stream_pipeline_source_transforms_destination_callback)
//
// import { pipeline } from 'stream'
// pipeline(sourceStream, compressStream, destStream, (err) => { ... })
