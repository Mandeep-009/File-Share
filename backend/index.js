import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { MONGODB_URL } from './config'

const app = express()
app.use(cors())

mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log('connected to database')
        app.listen(5173,()=>{
            console.log('server is listening on port 5173')
        })
    })