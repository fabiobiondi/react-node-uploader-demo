import { createServer } from 'http'
// formidable is an external library (`npm i --save formidable`) that can be used to parse
// multipart requests in a streaming fashion.
import formidable from 'formidable'

const server = createServer((req, res) => {
  // You can create a new formidable instance and configure it.
  // In this case we are limiting every file to be a max of 10 MB.
  const form = formidable({
    maxFileSize: 1024 * 1024 * 10, // 10 MB
    maxFieldsSize: 1024 * 1024 * 10, // 10 MB
    hash: 'md5'
  })

  // We can parse the current request.
  // This will return a set of fields and files (or an error).
  // By default, every file is saved in the tmp folder.
  form.parse(req, (err, fields, files) => {
    // handle possible errors in parsing the received data
    // including validation rules
    if (err) {
      console.error(err)
      res.writeHead(400)
      return res.end(JSON.stringify({ error: err.message }))
    }

    // if all went well, prints the received files and fields
    console.log({ fields, files })

    // here is tipically where you would process the files (e.g. create thumbnails, move the files around, etc.)

    // Sends a successful response to the client
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ message: 'YAY! All data received and stored, thanks!' }))
  })
})

server.listen(8000, () => console.log('Server started at http://localhost:8000'))

// You can do a lot more stuff with formidable. If you are curious check out the official documentation:
// https://www.npmjs.com/package/formidable
