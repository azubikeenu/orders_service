import {
    Strategy,
    StrategyOptions,
    ExtractJwt,
    VerifiedCallback,
  } from 'passport-jwt'
import config from '../config'
import { Vendor } from '../models'
import { JwtPayload } from '../types'
  

  
  const options: StrategyOptions = {
    secretOrKey: String(config.jwtSecret),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }
  
  async function verifyJwt(
    payload: JwtPayload,
    done: VerifiedCallback,
  ): Promise<void> {
    try {
      const vendor = await Vendor.findOne({email : payload.email})
        .select('-password')
  
      if (!vendor) {
        done(null, false , { message : "Unauthorized access"})

      } else {

        done(null, vendor)

      }
    } catch (error : any) {

      done(error, false, {message : error?.message})
    }
  }
  
  const jwtStrategy = new Strategy(options, verifyJwt)
  
  export { jwtStrategy }