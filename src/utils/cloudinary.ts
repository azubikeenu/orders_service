import { v2 as cloudinary } from 'cloudinary'
import config from '../config';
import { Logger } from './logger';

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.secret_key,
  });
  


  export async function uploadImage(imgFile: any) {
    try {
        let imgUrl = ""
        if (imgFile) {
            imgUrl = (
                await cloudinary.uploader.upload(imgFile.tempFilePath)
            ).secure_url;
        }
        return imgUrl;
    } catch (error) {
        Logger.error(error)
        throw new Error("An error occured while uploading image")
    }
}