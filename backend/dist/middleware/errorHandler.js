"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const ticketService_1 = require("../services/ticketService");
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            error: 'Validation Error',
            details: err.errors.map((e) => ({
                path: e.path.join('.'),
                message: e.message,
            })),
        });
        return;
    }
    if (err instanceof ticketService_1.NotFoundError) {
        res.status(404).json({
            error: err.message,
        });
        return;
    }
    console.error('Unhandled Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
    });
};
exports.errorHandler = errorHandler;
