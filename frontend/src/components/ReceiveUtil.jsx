import React, { useState } from 'react'
import { backendURL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReceiveUtil = (props) => {
    axios.defaults.withCredentials = true;
    const id = props.id;
    const [content,setContent] = useState(props.content)
    const navigate = useNavigate();
    const refreshHandler = async ()=>{
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
    <div style={{position:'relative'}}>
        <h2>Receive Page</h2>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{height:'20vh',display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
                <div>Your code:</div>
                <div style={{margin: '10px 30px',border: '1px solid violet',padding:'5px',width: '100px'}}><output>{id}</output></div>
            </div>
            <div style={{translate: '300px'}}>
                <button onClick={refreshHandler} style={{border: '1px solid black'}}>Refresh</button>
                {content[0]?(<button onClick={multipleDownloadHandler} style={{border: '1px solid black'}}>Download All</button>): null}
            </div>
        </div>
        <div>
            <div style={{position:'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div style={{height:'50vh',width:'70vw', display: 'flex', gap: '20px'}}>
                    {
                        content.map((file,index)=>{
                            let isPdf = false;
                            if(file.url.slice(-3)==="pdf") isPdf = true;
                            let fileUrl = file.url;
                            const firstFiveChars = fileUrl.substring(0, 5);
                            if(firstFiveChars !== 'https'){
                                fileUrl = "https" + fileUrl.substring(4);
                            }
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
                                <div key={index}>
                                    {/* <img src={file.url} height={150} width={150} alt='pic' /> */}
                                    {/* <RenderFile url={file.url} /> */}
                                    {isPdf?(<iframe title={index} src={fileUrl} height={150} width={150} />):(<img src={fileUrl} height={150} width={150} alt='pic' />)}
                                    <div>{file.name}</div>
                                    <button type='button' onClick={handleDownload}>Download</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ReceiveUtil