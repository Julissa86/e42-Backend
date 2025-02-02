"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = require("mongoose");
const NODE_ENV = process.env.NODE_ENV;
async function dbConnect() {
    const NODE_ENV = process.env.NODE_ENV;
    await (0, mongoose_1.connect)(NODE_ENV);
}
exports.default = dbConnect;
