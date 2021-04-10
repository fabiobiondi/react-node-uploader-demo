import React from 'react';
import { MFUploader } from './components/MFUploader';

export const Demo3UploaderUI: React.FC = () => {

  function onStartHandler() {
    console.log('start')
  }

  function onProgressHandler(value: number) {
    console.log('progress', value)
  }

  function onCompletedHandler() {
    console.log('completed')
  }
  return <div>
    <h2>Demo3 Uploader</h2>
    <MFUploader
      onStart={onStartHandler}
      onProgress={onProgressHandler}
      onComplete={onCompletedHandler}
    />
  </div>
};
