import { inject, injectable } from "inversify"
import { AuthService } from "../services"
import { INTERFACE_TYPE } from "../utils"
import { loginInput } from "../schemas"
import { Request, Response, NextFunction } from "express"
import { RequestWithToken } from "../types"
import { StatusCodes } from "http-status-codes"

@injectable()

export class AuthController {
    private authService: AuthService
    constructor(@inject(INTERFACE_TYPE.AuthService) authService: AuthService) {
        this.authService = authService
    }

    async loginHandler(req: Request<{}, {}, loginInput['body']>, res: Response, next: NextFunction) {
        try{
            const {email ,password} = req.body
            const token =  await  this.authService.loginUser({email,password})

            res.status(StatusCodes.OK).json({
                status : "success",
                message : "Logged in successfully",
                data : {
                    token
                }
            })
        }catch(error : any){
            next(error)
        }
    }


}