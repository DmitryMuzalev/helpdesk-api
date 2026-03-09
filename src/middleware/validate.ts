import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { HttpError } from '@/common/errors';

type Schemas = {
  body?: ObjectSchema;
  params?: ObjectSchema;
  query?: ObjectSchema;
};

export const validate =
  (schemas: Schemas) => (req: Request, _res: Response, next: NextFunction) => {
    const options = { abortEarly: false, stripUnknown: true };

    if (schemas.params) {
      const { error, value } = schemas.params.validate(req.params, options);
      if (error)
        throw new HttpError(400, 'Invalid route params', error.details);
      req.params = value;
    }

    if (schemas.query) {
      const { error, value } = schemas.query.validate(req.query, options);
      if (error)
        throw new HttpError(400, 'Invalid query params', error.details);
      req.query = value;
    }

    if (schemas.body) {
      const { error, value } = schemas.body.validate(req.body, options);
      if (error)
        throw new HttpError(400, 'Invalid request body', error.details);
      req.body = value;
    }

    next();
  };
