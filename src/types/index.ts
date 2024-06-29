import { IVerifyOptions } from "passport-local";
import { VendorDoc } from "../models";
import { Request } from "express";

export type strategyCallBack = (error: any, user?: VendorDoc | false, options?: IVerifyOptions)=> void 

// export type RequestWithToken = Request & {
//     token?: string;
// };

export type CustomRequest<TParams = {}, TResBody = {}, TReqBody = {}, TQuery = {}> = Request<TParams, TResBody, TReqBody, TQuery> & {
    token?: string;
    vendor? : VendorDoc

};

export type JwtPayload  = {
    email : string 
    iat? : number 
    exp ?: number
}