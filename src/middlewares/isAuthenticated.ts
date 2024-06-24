import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
import passport from "passport"
import { VendorDoc } from "../models"
import { CustomRequest } from "../types"

export function isAuthenticated(
    req : CustomRequest,
    res : Response,
    next : NextFunction,
  ){
    passport.authenticate(
      'jwt',
      { session: false },
      async (error : any, vendor : VendorDoc, info : any) => {
        if (error || !vendor || info) {   
       return next(createHttpError(StatusCodes.UNAUTHORIZED, error || info?.message))
        }
        req.vendor = vendor
        return next()
      },
    )(req, res, next)
  }

  