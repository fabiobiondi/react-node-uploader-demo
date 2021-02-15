import { createWriteStream } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

// Let's now create a "writable" stream which allows us to write data to a soruce in
// a streaming fashion, meaning we can send chunks to it over time.
const destFile = join(tmpdir(), 'stream-example.txt')
const writeFileStream = createWriteStream(destFile)

writeFileStream.write('You can write a string ') // you can write chunks as a string
writeFileStream.write(Buffer.from('or a buffer')) // or as a buffer
writeFileStream.end() // close the stream (completes the write operation)

console.log(`Data written into ${destFile}`)
