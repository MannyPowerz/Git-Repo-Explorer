import { Request, Response, NextFunction } from 'express';

// RESEARCH: "Higher-order functions in TypeScript"
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};