import React, { useRef, useState } from 'react';

// const form = document.getElementById('upload-form')
// const submit = document.getElementById('submit')
// const file = document.getElementById('file')

const STARTING = 'starting...'
const DONE = 'DONE!'

export const Demo1Uploader: React.FC = () => {
  const [msg, setMsg] = useState<string>('')
  const fileInput = useRef<HTMLInputElement | null>(null)

  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const file = fileInput.current;
    setMsg(STARTING);

    const formData = new FormData();
    if (file?.files) {
      formData.append(file.name, file.files[0]);

      const request = new XMLHttpRequest();
      const fileSize = file.files[0].size;

      request.upload.addEventListener('progress', function (e) {
        if (e.loaded <= fileSize) {
          const percent = Math.round(e.loaded / fileSize * 100);
          setMsg(`${percent}%`)
        }

        if (e.loaded === e.total) {
          setMsg(DONE)
        }
      });
      request.open("POST", "http://localhost:8000/");
      request.send(formData);
    }
  }

  return <div>
    <h2>Demo1Uploader</h2>
    {msg}
    <form
      onSubmit={onSubmitHandler}
      encType="multipart/form-data"
    >
      <label htmlFor="myfile">Select a file:</label>
      <input ref={fileInput} type="file" name="myfile"/>
      <button type="submit" disabled={msg === STARTING}>
        upload...
      </button>
    </form>
  </div>
};
