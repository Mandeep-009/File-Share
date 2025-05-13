import React, { useState } from 'react';
import axios from 'axios';
import {backendURL} from '../config';

const Authentication = ({authenticated}) => {
  const [code,setCode] = useState('');
  axios.defaults.withCredentials = true;
  async function checkCode () {
    
    try {
      const result = await axios.post(`${backendURL}/get-files`,{
        id: code,
        userAgent: navigator.userAgent,
        platform: navigator?.userAgentData?.platform || "unknown",
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0
      });
      if(result.data){
        authenticated(result.data._id,result.data.content);
      } else {
        window.alert('No such channel found');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        window.alert(error.response.data); 
      } else {
          console.error('An error occurred:', error);
      }
    }
    
  }
  return (
    <div className='auth-container'>
      <div className='container'>
        <h2 className='title'>Connect to Share</h2>
        <div className='input-group'>
          <input 
            type="text" 
            placeholder="Enter connection code"
            onChange={(e)=>setCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                checkCode();
              }
            }}
            className='code-input'
          />
        </div>
        <button className='primary-btn' onClick={checkCode}>
          <span>Connect</span>
          <i className="fas fa-link"></i>
        </button>
      </div>

      <style jsx>{`
        .auth-container {
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
          max-width: 400px;
          width: 100%;
        }

        .title {
          color: #2c3e50;
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .code-input {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .code-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .primary-btn {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          cursor: pointer;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}

export default Authentication

