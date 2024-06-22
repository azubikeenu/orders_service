import {app} from './app'



import { Logger, connect } from './utils';


const port = process.env.PORT || 5000;


app.listen(port, async () => {
    try {
        await connect()
        Logger.info(`App listening on port ${port}`)
    }catch(error : any){
       Logger.error(`An error occured while starting the application.${error.message}`)
    }

})