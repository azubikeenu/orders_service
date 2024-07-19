
import dotenv from 'dotenv'

dotenv.config()


const config = {

    environment : process.env.NODE_ENV || "development",

    development: {
        dbUri : process.env.DB_URI
    },

    port :  process.env.PORT || 5000,
    saltWalkFactor : process.env.SALT_WALK_FACTOR || 10 ,
    jwtSecret : process.env.SECRET_KEY,

    cloudinary : {
        name : process.env.CLOUDINARY_NAME ,
        api_key: process.env.CLOUDINARY_KEY,
        secret_key : process.env.CLOUDINARY_SECRET
    }
  
  };

 


  export default config;