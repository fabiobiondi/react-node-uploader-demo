import React from 'react';
import { useUploader } from './hooks/useUploader';

export const Demo2UploaderWithHook: React.FC = () => {

  const { registerInput, text, submitHandler, pending} = useUploader()

  return <div>
    <h2>Demo2 Uploader With Hook</h2>
    {text}
    <form onSubmit={submitHandler} encType="multipart/form-data">
      <label htmlFor="myfile">Select a file:</label>
      <input ref={registerInput} type="file" name="myfile"/>
      <button type="submit" disabled={pending}>
        upload...
      </button>
    </form>
  </div>
};
