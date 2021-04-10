import React  from 'react';
import { useUploader } from '../hooks/useUploader';
import './MFUploader.css';

export const MFUploader: React.FC = () => {
  const { text, progress, submitHandler, registerInput } = useUploader()

  return <>
    <form>
      <div className="input-file-container">
        <input className="input-file"
               onChange={submitHandler}
               ref={registerInput} type="file" name="myfile"/>
        <label htmlFor="my-file" className="input-file-trigger">
          {text}
        </label>

        <div className="progress-bar" style={{ width: progress + '%'}} />
      </div>
    </form>
  </>
};
