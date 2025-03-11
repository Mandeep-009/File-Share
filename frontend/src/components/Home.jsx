import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <div className='container'>
        <h1 className='title'>File Share App</h1>
        
        <div className='button-container'>
          <Link to={'/send'} className='link-button'>
            <button className='primary-btn'>
              <span>Send Files</span>
              <i className="fas fa-upload"></i>
            </button>
          </Link>
          
          <Link to={'/receive'} className='link-button'>
            <button className='primary-btn'>
              <span>Receive Files</span>
              <i className="fas fa-download"></i>
            </button>
          </Link>
        </div>

        <p className='info-text'>*Currently only for PDF and images</p>

        <div className='divider'></div>

        <div className='text-share-section'>
          <p>Visit our other website for Sharing Text</p>
          <a href="https://text-share-app.vercel.app" className='link-button'>
            <button className='secondary-btn'>
              <span>Share Text</span>
              <i className="fas fa-file-alt"></i>
            </button>
          </a>
        </div>
      </div>

      <style jsx>{`
        .home {
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
          max-width: 500px;
          width: 100%;
        }

        .title {
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          font-weight: bold;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .link-button {
          text-decoration: none;
          width: 100%;
        }

        .primary-btn, .secondary-btn {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .primary-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .secondary-btn {
          background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
          color: #2c3e50;
        }

        .primary-btn:hover, .secondary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .info-text {
          color: #666;
          font-size: 0.9rem;
          margin: 1rem 0;
        }

        .divider {
          height: 1px;
          background: #e0e0e0;
          margin: 2rem 0;
        }

        .text-share-section {
          color: #2c3e50;
        }

        @media (max-width: 480px) {
          .container {
            padding: 1.5rem;
          }

          .title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
