import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { MONGODB_URL , PORT } from './config.js'
import Files from './models/Files.js'
import upload from './multer-middleware.js'
import { uploadOnCloudinary } from './cloudinary.js'
import pLimit from 'p-limit'

const app = express()
app.use(cors({
    origin: ["https://filecross.vercel.app","http://localhost:3000"],
    methods: ["POST" , "GET" , "PATCH" , "DELETE" ]
}))
app.use(express.json())

app.get('/',(req,res)=>{
    try {
        res.status(200).send('I am running')
    } catch (error) {
        console.log(error)
        res.status(400).send({message: error.message})
    }
})

app.get('/:code',async(req,res)=>{
    try {
        const id = req.params.code;
        const result = await Files.findById(id)
        if(result){
            return res.status(200).send(result)
        }
        else{
            return res.status(404).send('No channel found by this id')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({message: error.message})
    }
})

app.post('/new-connection', async(req,res)=>{
    try {
        const _id = req.body.id;
        const obj = {_id};
        await Files.create(obj)
        res.status(201).send('channel created successfully')
    } catch (error) {
        console.log(error)
        res.status(400).send({message: error.message})
    }
})

app.patch('/add-files', upload.array("files",10), async(req,res)=>{
    try {
        const id = req.body.id;
        const fileUploadResponses = req.files?.map(file => ({
            url: file.path,
            public_id: file.filename,
          }));
        const limit = pLimit(10);
        console.log(fileUploadResponses)

        const imagesToUpload = fileUploadResponses.map((file) => {
            return limit(async ()=>{
                const url = await uploadOnCloudinary(file.url)
                console.log(url);
                const result = {url,name: file.public_id.slice(5)}
                return result;
            })
        })
        let uploads = await Promise.all(imagesToUpload);

        const response = await Files.findByIdAndUpdate(id,{content: uploads})
        if(!response){
            return res.status(404).send({message: 'no channel exist by this id'})
        }


        res.status(201).send(uploads);
        
    } catch (error) {
        console.log(error)
        res.status(400).send({message: error.message})
    }
})

mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log('connected to database')
        app.listen(PORT,()=>{
            console.log(`server is listening on port ${PORT}`)
        })
    })
    .catch((err)=>{
        console.log('an error occured: ', err)
    })