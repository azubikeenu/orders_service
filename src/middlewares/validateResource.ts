import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { helperUtils, Logger } from '../utils';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      const message = helperUtils.parseErrorMessage(err as ZodError);
      Logger.error(message);
      res.status(400).send({ success: false, message });
    }
  };

export  {validate};