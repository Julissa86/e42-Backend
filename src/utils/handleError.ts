import { Response } from 'express';

const handleHttpError = (res: Response, message = "Algo sucedió", code = 403): void => {
    res.status(code);
    res.send({ error: message });
};

export { handleHttpError };