import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (err: any, req: Request, res: any, next: NextFunction) => {
    if (err instanceof Array && err[0] instanceof ValidationError) {
        const errors = err.map((e: ValidationError) => e.constraints);
        return res.status(400).json({ errors });
    }

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
};
