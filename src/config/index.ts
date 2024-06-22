
import dotenv from 'dotenv'

dotenv.config()


const config = {

    environment : process.env.NODE_ENV || "development",

    development: {
        dbUri : process.env.DB_URI
    },

    port :  process.env.PORT || 5000,
    saltWalkFactor : process.env.SALT_WALK_FACTOR || 10 
  };
  


  export default config;