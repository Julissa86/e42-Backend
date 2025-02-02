"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_delete_1 = __importDefault(require("mongoose-delete"));
// Esquema principal para el usuario y su información de pago
const InfoSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
// Plugin para soft delete
InfoSchema.plugin(mongoose_delete_1.default, { overrideMethods: "all" });
// Método estático para obtener todos los datos
InfoSchema.statics.findAllData = function () {
    return this.find({});
};
const TrackModel = (0, mongoose_1.model)('storages', InfoSchema);
exports.default = TrackModel;
