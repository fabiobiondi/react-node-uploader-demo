import React  from 'react';
import { useUploader } from '../hooks/useUploader';
import './MFUploader.css';

interface MFUploader {
  onStart: () => void;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}
export const MFUploader: React.FC<MFUploader> = ({ onStart, onProgress, onComplete }) => {
  const {
    text, progress, submitHandler, registerInput
  } = useUploader(onStart, onProgress, onComplete)

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
