import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateCreateItem = [
  check('user').exists().notEmpty(),
  check('password').exists().notEmpty(),
];

const validateErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { validateCreateItem, validateErrors };
