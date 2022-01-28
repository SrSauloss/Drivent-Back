import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

import InvalidDataError from "@/errors/InvalidData";

interface ValidationOptions {
  abortEarly: boolean;
}

export default function schemaValidatingMiddleware(schema: Schema, options: ValidationOptions = { abortEarly: false }, checkQuery = false) {
  return function(req: Request, res: Response, next: NextFunction) {
    console.log("teste");
    const object = checkQuery? req.query : req.body;
    const validation = schema.validate(object, { abortEarly: options.abortEarly });

    if (validation.error) {
      throw new InvalidDataError("body", validation.error.details.map(error => error.message));
    }

    next();
  };
}
