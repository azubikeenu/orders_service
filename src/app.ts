import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'

import { router } from './routes/v1'

import createHttpError, { HttpError } from 'http-errors'

import { StatusCodes } from 'http-status-codes'

import config from './config'
import { errorHandler, successHandler } from './utils'




const app = express()


//passport.use("local", localStrategy)


app.use(successHandler)

app.use(errorHandler)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


app.use('/api/v1', router)


app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(StatusCodes.NOT_FOUND, 'Invalid endpoint or URL'))
})



app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {

  const { status = 500, message, stack } = err

  res.locals.errorMessage = message

  const response: { status: number; message: string; stack?: string } = {
    status,
    message,
  }

  if (config.environment === 'development') {
    response.stack = stack
  }

  res.status(status).json({ status : "failed", message })
})

export { app }

