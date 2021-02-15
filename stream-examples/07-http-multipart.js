import { createServer } from 'http'
import formidable from 'formidable'

const server = createServer((req, res) => {
  const form = formidable({
    maxFileSize: 1024 * 1024 * 10, // 10 MB
    maxFieldsSize: 1024 * 1024 * 10, // 10 MB
    hash: 'md5'
  })

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
