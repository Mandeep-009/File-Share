import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import { config } from 'dotenv';
import { API_KEY, API_SECRET, CLOUD_NAME } from './config.js';



export const uploadOnCloudinary = async (localfilepath) => {
    try {
        config();
        cloudinary.config({
            cloud_name: CLOUD_NAME, 
            api_key: API_KEY, 
            api_secret: API_SECRET
        })
        
        if(!localfilepath) return null;
        console.log(localfilepath,'line 13 cloudinary')
        const response = await cloudinary.uploader.upload(localfilepath)
        console.log(localfilepath)
        fs.unlinkSync(localfilepath)
        return response.url;
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localfilepath)
        return 'error paaya gaya tha';
    }
}