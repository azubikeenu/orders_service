import {IStrategyOptions, Strategy} from 'passport-local'

import { Vendor } from '../models'
import { strategyCallBack } from '../types'

    const localStrategyOpts: IStrategyOptions = {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }

  
     async function localStrategyHandler(username : string, password: string ,done : strategyCallBack){
        try {
             const user = await Vendor.findOne({email:username})
             
            if (!user) {
              return done(null, false, { message: 'Incorrect username or password' });
            }
            if(!(await user.comparePassword(password))) {
                return done(null , false , {message : "Incorrect username or password"})
            }
            
            return done(null, user);
          } catch (err) {
            return done(err);
          }

    }
  
    const localStrategy = new Strategy(localStrategyOpts ,localStrategyHandler)

    export {localStrategy}
