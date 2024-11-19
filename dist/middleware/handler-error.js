"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handlerError;
function handlerError() {
    return (err, req, res, next) => {
        const status = err.status;
        res.status(status).json({
            status,
            message: err.message
        });
    };
}
