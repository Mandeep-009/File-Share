// FileUpload.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendURL } from '../config.js';

const FileUpload = (props) => {
    axios.defaults.withCredentials = true;
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
    <div className='upload-wrapper'>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className='drop-area'
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className='drop-message'>
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Drop the files here...</p>
          </div>
        ) : (
          <div className='drop-message'>
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Drag 'n' drop files here, or click to select</p>
            <span className='file-limit'>Maximum 10 files allowed</span>
          </div>
        )}
      </div>

      <div className='files-preview'>
        {done ? (
          files.map((file, index) => {
            let isPdf = file.url.slice(-3) === "pdf";
            let fileUrl = file.url.startsWith('https') ? file.url : "https" + file.url.substring(4);
            return (
              <div key={index} className='file-item'>
                <div className='file-preview'>
                  {isPdf ? (
                    <iframe title={index} src={fileUrl} height={150} width={150} />
                  ) : (
                    <img src={fileUrl} height={150} width={150} alt='preview' />
                  )}
                </div>
                <div className='file-name'>{file.name}</div>
              </div>
            )
          })
        ) : (
          <div className='loading'>
            <div className='spinner'></div>
            <p>Uploading...</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .upload-wrapper {
          width: 100%;
          height: 100%;
        }

        .drop-area {
          border: 2px dashed #667eea;
          border-radius: 10px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${isDragActive ? '#f0f4ff' : '#fff'};
          transition: all 0.3s ease;
        }

        .drop-message {
          text-align: center;
          color: #2c3e50;
        }

        .drop-message i {
          font-size: 3rem;
          color: #667eea;
          margin-bottom: 1rem;
        }

        .file-limit {
          display: block;
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.5rem;
        }

        .files-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1rem;
        }

        .file-item {
          background: white;
          border-radius: 8px;
          padding: 0.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .file-preview {
          border-radius: 4px;
          overflow: hidden;
        }

        .file-name {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #2c3e50;
        }

        .loading {
          width: 100%;
          text-align: center;
          color: #2c3e50;
        }

        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #667eea;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FileUpload;
