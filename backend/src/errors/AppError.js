export class AppError extends Error {
    constructor(message, statusCode = 500, errorCode, error = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.error = error;
        this.timestamp = new Date().toISOString();   
    }
} 