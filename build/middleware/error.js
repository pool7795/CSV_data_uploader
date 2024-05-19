"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    status;
    message;
    constructor(message, status) {
        this.message = message;
        this.status = status;
    }
}
exports.ApiError = ApiError;
