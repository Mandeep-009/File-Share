// FileUpload.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendURL } from '../config.js';

const FileUpload = (props) => {
    const [files,setFiles] = useState([])
    const [done,setDone] = useState(true);
    const id = props.id;
    const navigate = useNavigate();
  const onDrop = async (acceptedFiles) => {
    // Handle the accepted files here
    console.log(acceptedFiles)
    if(acceptedFiles.length > 10) return alert('Maximum of 10 files allowed at a time.');
    setDone(false);

    const formData = new FormData();
    // formData.append("files",acceptedFiles);
    // formData.append('id',id);

    acceptedFiles.forEach((file) => {
      const newFileName = id + file.name; // Replace with your desired filename
      const newFile = new File([file], newFileName);
      formData.append('files', newFile); // 'files[]' if backend expects array format
    });
    formData.append('id', id);

    try {
      const response = await axios.patch(`${backendURL}/add-files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setFiles(response.data)
      setDone(true);
      
    } catch (error) {
      if(error.response && error.response.data){
        if(error.response.status === 404){
          alert('Session expired');
          navigate('/');
        }
        else{
          alert(error.response.data.message);
          console.error(error);
        }
      }
      else {
        console.error('Error uploading data: ', error);
      }
    }

    // // setFiles([])
    // for (let key in acceptedFiles) {
    //     if (acceptedFiles.hasOwnProperty(key)) {
    //         let value = acceptedFiles[key];
    //         // setFiles([...files,value])
    //         console.log(value)
    //     }
    // }
    
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true, // Allow multiple files
  });

  return (
    <div>
      <div
        {...getRootProps({ className: 'dropzone' })}
        style={{
          border: '2px dashed #007bff',
          borderRadius: '4px',
          height: '60vh',
          alignContent: 'center',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#e7f1ff' : '#fff',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <br />
      <div style={{display: 'flex', gap: '20px'}}>
        {done?(
          files.map((file,index)=>{
            let isPdf = false;
            if(file.url.slice(-3)==="pdf") isPdf = true;
            return (
                <div key={index} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                    <div>{isPdf?(<iframe title={index} src={file.url} height={150} width={150} />):(<img src={file.url} height={150} width={150} alt='pic' />)}</div>
                    <div>{file.name}</div>
                </div>
            )
        })
        ): 'sending....'}
      </div>
    </div>
  );
};

export default FileUpload;
