import {useState} from 'react'

const API_URL = 'http://localhost:5173/add-files'
const API_METHOD = 'PATCH'
const STATUS_IDLE = 0
const STATUS_UPLOADING = 1

const Upload = () => {
    const [files, setFiles] = useState([])
    const [status, setStatus] = useState(STATUS_IDLE)

    const uploadFiles = (data)=> {
        setStatus(STATUS_UPLOADING)

        fetch(API_URL, {
            method: API_METHOD,
            body: data,
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err))
        .finally(() => setStatus(STATUS_IDLE))
    }

    const packFiles = (files)=> {
        const data = new FormData()
        files.forEach((file, i) => {
            data.append(`file-${i}`, file, file.name)
        })
        return data
    }

    const handleUploadClick = () => {
        if (files.length) {
            const data = packFiles(files)
            uploadFiles(data)
        }
    }

    const renderFileList = () => (<ol>
        {[...files].map((f, i) => (
            <li key={i}>{f.name} - {f.type}</li>
        ))}
    </ol>)

    const getButtonStatusText = () => (
        (status === STATUS_IDLE) ? 
            'Send to server' : 
            <img src = "./load.svg" />
    )

    return (<div>
        <input
            type="file"
            accept="image/*" 
            multiple
            onChange={(e)=> setFiles(e.target.files)} />
        {renderFileList()}
        <button 
            onClick={handleUploadClick} 
            disabled={status === STATUS_UPLOADING}>
                {getButtonStatusText()}
        </button>
    </div>)
}

export default Upload