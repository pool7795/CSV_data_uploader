"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
function validateUser(user) {
    if (!user.name || !user.email) {
        return false;
    }
    if (user.age !== undefined &&
        (typeof user.age !== "number" || user.age <= 0)) {
        return false;
    }
    if (user.role && user.role !== "user" && user.role !== "admin") {
        return false;
    }
    return true;
}
exports.validateUser = validateUser;
