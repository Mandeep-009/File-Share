import React from 'react'
import FileUpload from './FileUpload';

const SendUtil = (props) => {
    const id = props.id;
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <h2>Send Page</h2>
        <div>Your Code: <output style={{border: '1px solid pink', padding: '5px'}}>{id}</output></div>
        <br />
        <div className='container' style={{width: '80vw', height: '60vh', border: '1px dotted gray', alignContent: 'center'}}>
            {/* <p>Drop files here</p>
            <h4>OR</h4>
            <button>Upload</button> */}
            <FileUpload id={id}/>
        </div>
    </div>
  )
}

export default SendUtil