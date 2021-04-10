import React, { useRef, useState } from 'react';

const DEFAULT_MSG = 'SELECT A FILE...';
const STARTING = 'starting...';

export function useUploader() {
  const [text, setText] = useState<string>(DEFAULT_MSG);
  const [progress, setProgress] = useState<number>(50);
  const fileInput = useRef<HTMLInputElement | null>(null);

  function onSubmitHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setProgress(0);

    const file = fileInput.current;
    setText(STARTING);

    const formData = new FormData();
    if (file?.files && file?.files[0]) {
      formData.append(file.name, file.files[0]);

      const request = new XMLHttpRequest();
      const fileSize = file.files[0].size;

      request.upload.addEventListener('progress', function (e) {
        if (e.loaded <= fileSize) {
          const percent = Math.round(e.loaded / fileSize * 100);
          setProgress(percent);
          setText(`${percent}%`)
          console.log(percent)
        }

        if (e.loaded === e.total) {
          setText(DEFAULT_MSG);
          setProgress(0);
        }
      });
      request.open("POST", "http://localhost:8000/");
      request.send(formData);
    }
  }

  return {
    text,
    progress,
    registerInput: fileInput,
    submitHandler: onSubmitHandler
  }

}
