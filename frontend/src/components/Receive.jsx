import React, { useState } from 'react'
import Authentication from './Authentication';
import ReceiveUtil from './ReceiveUtil';

const Receive = () => {
  const [connectionCode,setConnectionCode] = useState('');
  const [content,setContent] = useState('');
  const authenticationDone = (code,content) => {
    setConnectionCode(code);
    setContent(content);
  }
  return (
    <div>
      {
        !connectionCode ? (
          <Authentication authenticated={authenticationDone}/>
        ) : (
          <ReceiveUtil id={connectionCode} content={content}/>
        )
      }
    </div>
  )
}

export default Receive
