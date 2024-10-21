import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendURL } from '../config';
import SendUtil from './SendUtil';

const Send = () => {
  axios.defaults.withCredentials = true;
  const [loading,setLoading] = useState(true);
  const [id,setId] = useState('');
  useEffect(()=>{
    async function createChannel () {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let randomString = '';
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * 36);
        randomString += characters[randomIndex];
      }
      setId(randomString);
      try {
        await axios.post(`${backendURL}/new-connection`,{id:randomString});
        setLoading(false);
      } catch (error) {
        console.error('error creating channel: ',error);
      }

    }
    createChannel();
  },[])
    

    
  return (
    <div>
      {
        loading? (
          <div>Generating new token...</div>
        ) : (
          <SendUtil id={id} content={[]}/>
        )
      }
    </div>
  )
}

export default Send
