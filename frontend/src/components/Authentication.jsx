import React, { useState } from 'react';
import axios from 'axios';
import {backendURL} from '../config';

const Authentication = ({authenticated}) => {
  const [code,setCode] = useState('');
  axios.defaults.withCredentials = true;
  async function checkCode () {
    
    try {
      const result = await axios.get(`${backendURL}/${code}`);
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
    <div>
      <div style={{fontSize:'18px',margin:'50px 0 0 0',justifyContent:'center'}}>Enter connection code:</div>
      <div>
        <input type="text" onChange={(e)=>setCode(e.target.value)} style={{height:'30px',width:'200px',fontSize:'18px',margin:'10px 0 30px 0', border:'1px solid black'}}/>
      </div>
      <button onClick={checkCode}>Connect</button>
    </div>
  )
}

export default Authentication

