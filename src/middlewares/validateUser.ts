import passport from "passport";
import * as jwt  from "jsonwebtoken";
import {Response,NextFunction } from "express";
import config from "../config";
import { CustomRequest } from "../types";


export function validateUser(req : CustomRequest,res : Response,next :NextFunction){
    passport.authenticate('local', (err : any, user : any, info : any)  => {
        if (err) return next(err);

        if (!user) return res.status(401).json({ message: info.message });

        const token = jwt.sign({ email: user.email }, String(config.jwtSecret), {
            algorithm: 'HS512',
            expiresIn: "1hr"
        })

        req.token = token 

        return next()

      })(req, res, next);

}

