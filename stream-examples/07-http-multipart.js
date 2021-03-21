import { createServer } from 'http'
import { rename } from 'fs'
// formidable is an external library (`npm i --save formidable`) that can be used to parse
// multipart requests in a streaming fashion.
import formidable from 'formidable'
// allows us to choose the extension of a file from its mime type
import mime from 'mime-types'
import { join } from 'desm'

const server = createServer((req, res) => {
  // ADDS support for CORS to simplify interactions with the frontend.
  const headers = {
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers)
    return res.end()
  }
  // END CORS

  // You can create a new formidable instance and configure it.
  // In this case we are limiting every file to be a max of 10 MB.
  const form = formidable({
    maxFileSize: 1024 * 1024 * 100, // 100 MB
    maxFieldsSize: 1024 * 1024 * 100, // 100 MB
    hash: 'md5'
  })

  // We can parse the current request.
  // This will return a set of fields and files (or an error).
  // By default, every file is saved in the tmp folder.
  form.parse(req, (err, fields, files) => {
    // handle possible errors in parsing the received data
    // including validation rules
    if (err) {
      console.error(`File upload failed.`, err)
      res.writeHead(400, headers)
      return res.end(JSON.stringify({ error: err.message }))
    }

    // here is tipically where you would VALIDATE and process the files (e.g. create thumbnails, move the files around, etc.)
    // For now we just copy the files in a local folder and give them a name based on their hash and extension
    for (const file of Object.values(files)) {
      const extension = mime.extension(file.type)
      const destFilename = `${file.hash}.${extension}`
      const destPath = join(import.meta.url, 'uploads', destFilename)
      rename(file.path, destPath, (err) => {
        if (err) {
          console.error(`Failed to move ${file.path} to ${destPath}: ${err.message}`)
        }
      })
      file.path = destPath
    }

    // Finally we print the received files and fields
    console.log({ fields, files })

    // Sends a successful response to the client
    res.writeHead(200, { ...headers, 'content-type': 'application/json' })
    res.end(JSON.stringify({ message: 'YAY! All data received and stored, thanks!' }))
  })
})

server.listen(8000, () => console.log('Server started at http://localhost:8000'))

// You can do a lot more stuff with formidable. If you are curious check out the official documentation:
// https://www.npmjs.com/package/formidable
