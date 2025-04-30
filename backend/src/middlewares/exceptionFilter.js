import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';

function exceptionFilter(err, req, res, next) {
    console.error('Erro capturado pelo Exception Filter:', err);

    // Tratamento de erro do Zod
    if (err instanceof ZodError) {
        const formattedErrors = err.errors.reduce((acc, error) => {
            return `${acc}${error.message}; `;
        }, "");

        return res.status(400).json({
            success: false,
            message: formattedErrors,
            errorCode: "VALIDATION_ERROR",
        });
    }

    // Tratamento de AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errorCode: err.errorCode
        });
    }

    // Erro genérico
    return res.status(500).json({
        success: false,
        message: err.message,
        error: null
    });
}

export default exceptionFilter;
  