import React, { useRef, useState } from 'react';

const STARTING = 'starting...'
const DONE = 'DONE!'

export function useUploader() {
  const [msg, setMsg] = useState<string>('')
  const [pending, setPending] = useState<boolean>(false)
  const fileInput = useRef<HTMLInputElement | null>(null)

  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const file = fileInput.current;
    setMsg(STARTING);
    setPending(true);

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
          setMsg(DONE);
          setPending(false)
        }
      });
      request.open("POST", "http://localhost:8000/");
      request.send(formData);
    }
  }

  return {
    text: msg,
    pending,
    registerInput: fileInput,
    submitHandler: onSubmitHandler
  }

}
