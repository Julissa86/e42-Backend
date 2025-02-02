"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Phishing API",
        version: "1.0.1",
    },
    servers: [
        {
            url: "http://localhost:3001/api",
        },
        {
            url: "https://afternoon-journey-32165.herokuapp.com/api",
        },
    ],
    components: {
        card: {
            type: "object",
            required: ["user", "password"],
            properties: {
                user: {
                    type: "string",
                },
                password: {
                    type: "string",
                },
            },
            id: {
                type: "string",
            },
        },
    },
};
const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};
const openApiConfigration = (0, swagger_jsdoc_1.default)(options);
exports.default = openApiConfigration;
