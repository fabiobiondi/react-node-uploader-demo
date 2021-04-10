import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const uploadFile = async (e: any) => {
    const files = e.target.files
    console.log('files', files)
    const form = new FormData()
    for (let i = 0; i < files.length; i++) {
      form.append('files', files[i], files[i].name)
    }
    try {
      let request = await fetch('/', {
        method: 'post',
        body: form,
      })
      const response = await request.json()
      console.log('Response', response)
    } catch (err) {
      alert('Error uploading the files')
      console.log('Error uploading the files', err)
    }
  }


  return (
    <div className="App">
     {/* <form action="http://localhost:8000" encType="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title"/></div>
        <div>File: <input type="file" name="multipleFiles" multiple={true}/></div>
        <input type="submit" value="Upload"/>


      </form>*/}

      <input type="file" multiple onChange={e => uploadFile(e)}/>

    </div>
  );
}

export default App;
