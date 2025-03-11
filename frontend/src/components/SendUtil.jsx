import React from 'react'
import FileUpload from './FileUpload';

const SendUtil = (props) => {
    const id = props.id;
  return (
    <div className='send-container'>
      <div className='container'>
        <h2 className='title'>Share Files</h2>
        <div className='code-display'>
          <span>Your Connection Code:</span>
          <output className='code'>{id}</output>
        </div>
        <div className='upload-container'>
          <FileUpload id={id}/>
        </div>
      </div>

      <style jsx>{`
        .send-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
        }

        .container {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 800px;
          width: 100%;
        }

        .title {
          color: #2c3e50;
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .code-display {
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .code {
          margin-left: 10px;
          padding: 0.2rem 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 8px;
          font-family: monospace;
        }

        .upload-container {
          width: 100%;
          height: 60vh;
        }
      `}</style>
    </div>
  )
}

export default SendUtil