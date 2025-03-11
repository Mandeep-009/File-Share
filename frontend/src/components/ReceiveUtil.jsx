import React, { useState } from 'react'
import { backendURL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReceiveUtil = (props) => {
    axios.defaults.withCredentials = true;
    const id = props.id;
    const [content,setContent] = useState(props.content)
    const navigate = useNavigate();
    
    const refreshHandler = async () => {
        try {
            const response = await axios.get(`${backendURL}/${id}`);
            if(response.data){
                setContent(response.data.content)
            } else {
                window.alert('Session expired');
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status===404) {
                window.alert('Session expired'); 
                navigate('/');
            } else {
                console.error('An error occurred:', error);
            }
        }
    }
    
    const multipleDownloadHandler = async () => {
        try {
            const downloadPromises = content.map(async (file) => {
                let fileUrl = file.url;
                const firstFiveChars = fileUrl.substring(0, 5);
                if(firstFiveChars !== 'https'){
                fileUrl = "https" + fileUrl.substring(4);
                }
                const response = await fetch(fileUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${fileUrl}: ${response.statusText}`);
                }
                const blob = await response.blob();
                const link = document.createElement('a');
                const objectURL = URL.createObjectURL(blob);
                link.href = objectURL;
                link.setAttribute('download', file.name); 
                document.body.appendChild(link); // Append link to the body for Firefox compatibility
                link.click();
                link.remove(); // Clean up the link element
                URL.revokeObjectURL(objectURL); // Revoke the object URL
            });
    
            await Promise.all(downloadPromises);
        } catch (error) {
            console.error('Error during multiple downloads:', error);
        }
    };
    
    return (
        <div className='receive-container'>
            <div className='container'>
                <h2 className='title'>Received Files</h2>
                
                <div className='header-section'>
                    <div className='code-display'>
                        <span>Your Connection Code:</span>
                        <output className='code'>{id}</output>
                    </div>
                    
                    <div className='action-buttons'>
                        <button className='secondary-btn' onClick={refreshHandler}>
                            <i className="fas fa-sync-alt"></i>
                            <span>Refresh</span>
                        </button>
                        
                        {content[0] && (
                            <button className='primary-btn' onClick={multipleDownloadHandler}>
                                <i className="fas fa-download"></i>
                                <span>Download All</span>
                            </button>
                        )}
                    </div>
                </div>

                <div className='files-grid'>
                    {content.map((file, index) => {
                        let isPdf = file.url.slice(-3) === "pdf";
                        let fileUrl = file.url.startsWith('https') ? file.url : "https" + file.url.substring(4);
                        
                        const handleDownload = async(e) => {
                            e.preventDefault();
                            const response = await fetch(fileUrl);
                            const blob = await response.blob();
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(blob);
                            link.setAttribute('download', file.name); 
                            link.click();
                        };

                        return (
                            <div key={index} className='file-card'>
                                <div className='file-preview'>
                                    {isPdf ? (
                                        <iframe title={index} src={fileUrl} />
                                    ) : (
                                        <img src={fileUrl} alt='preview' />
                                    )}
                                </div>
                                <div className='file-info'>
                                    <div className='file-name'>{file.name}</div>
                                    <button className='download-btn' onClick={handleDownload}>
                                        <i className="fas fa-download"></i>
                                        <span>Download</span>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <style jsx>{`
                .receive-container {
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
                    max-width: 1000px;
                    width: 100%;
                }

                .title {
                    color: #2c3e50;
                    font-size: 2rem;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                .header-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .code-display {
                    font-size: 1.1rem;
                }

                .code {
                    margin-left: 10px;
                    padding: 0.5rem 1rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-radius: 8px;
                    font-family: monospace;
                }

                .action-buttons {
                    display: flex;
                    gap: 1rem;
                }

                .primary-btn, .secondary-btn {
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .primary-btn {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }

                .secondary-btn {
                    background: #f8f9fa;
                    color: #2c3e50;
                    border: 1px solid #e0e0e0;
                }

                .primary-btn:hover, .secondary-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .files-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1.5rem;
                }

                .file-card {
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    overflow: hidden;
                    transition: transform 0.2s;
                }

                .file-card:hover {
                    transform: translateY(-3px);
                }

                .file-preview {
                    height: 150px;
                    width: 100%;
                    overflow: hidden;
                    background: #f8f9fa;
                }

                .file-preview img, .file-preview iframe {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .file-info {
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .file-name {
                    font-size: 0.9rem;
                    color: #2c3e50;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 70%;
                }

                .download-btn {
                    background: none;
                    border: none;
                    color: #667eea;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 5px;
                    transition: background-color 0.2s;
                }

                .download-btn:hover {
                    background-color: #f0f4ff;
                }

                @media (max-width: 768px) {
                    .header-section {
                        flex-direction: column;
                        align-items: stretch;
                        text-align: center;
                    }

                    .action-buttons {
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    )
}

export default ReceiveUtil