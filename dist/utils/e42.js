"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateErrors = exports.validateCreateItem = void 0;
const express_validator_1 = require("express-validator");
const validateCreateItem = [
    (0, express_validator_1.check)('user').exists().notEmpty(),
    (0, express_validator_1.check)('password').exists().notEmpty(),
];
exports.validateCreateItem = validateCreateItem;
const validateErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateErrors = validateErrors;
