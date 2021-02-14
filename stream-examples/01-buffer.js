import buffer from 'buffer'
import { readFileSync } from 'fs'
import { join } from 'desm'

// create a buffer with raw data in node.js
const bufferFromString = Buffer.from('Ciao Fabio')
const bufferFromByteArray = Buffer.from([67, 105, 97, 111, 32, 70, 97, 98, 105, 111])
const bufferFromHex = Buffer.from('4369616f20466162696f', 'hex')
const bufferFromBase64 = Buffer.from('Q2lhbyBGYWJpbw==', 'base64')

// data is stored in binary format
console.log(bufferFromString) // <Buffer 43 69 61 6f 20 46 61 62 69 6f>
console.log(bufferFromByteArray) // <Buffer 43 69 61 6f 20 46 61 62 69 6f>
console.log(bufferFromHex) // <Buffer 43 69 61 6f 20 46 61 62 69 6f>
console.log(bufferFromBase64) // <Buffer 43 69 61 6f 20 46 61 62 69 6f>

// Raw buffer data can be "visualized" in hex and base64
console.log(bufferFromString.toString('hex')) // 4369616f20466162696f
console.log(bufferFromString.toString('base64')) // Q2lhbyBGYWJpbw==

// Buffers will allocate memory and their maximus size is limited to a few GBs of memory
const biggestBuffer = Buffer.alloc(buffer.constants.MAX_LENGTH) // creates a buffer with the maximum possible size
console.log(biggestBuffer) // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 4294967245 more bytes>

// You can also create a buffer using the content of a file
const bufferFromFile = readFileSync(join(import.meta.url, 'package.json'))
console.log(bufferFromFile) // <Buffer 7b 0a 20 20 22 6e 61 6d 65 22 3a 20 22 72 65 61 63 74 2d 6e 6f 64 65 2d 75 70 6c 6f 61 64 65 72 2d 64 65 6d 6f 2d 73 74 72 65 61 6d 73 2d 65 78 61 6d ... 771 more bytes>

// What if you try to read a very big file into a buffer?
// const explodingBuffer = readFileSync(join(import.meta.url, 'the-matrix.mp4')) // throws ERR_FS_FILE_TOO_LARGE!
// HOT TIP: if you need to create a big file, try `dd if=/dev/random of=the-matrix.mp4 bs=1 count=0 seek=3g`
