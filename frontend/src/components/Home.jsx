import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
        <h2>File Share App</h2>
        <div>
            <Link to={'/send'}>
                <button style={{margin: '5px'}}>Send Files</button>
            </Link>
        </div>
        <div>
            <Link to={'/receive'}>
                <button style={{margin: '5px'}}>Receive Files</button>
            </Link>
        </div>
        <div>*Currently only for pdf and images</div>
        <br />
        <br />
        <div>Visit our other website for Sharing Text</div>
        <a href="https://text-share-app.vercel.app"><button>Share Text</button></a>
    </div>
  )
}

export default Home
