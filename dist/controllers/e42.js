"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItems = getItems;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.getItem = getItem;
const e42_1 = __importDefault(require("../models/e42")); // Asegúrate de que el modelo esté bien importado
const express_validator_1 = require("express-validator");
const handleError_1 = require("../utils/handleError");
// Obtener todos los items
async function getItems(req, res) {
    try {
        const data = await e42_1.default.find();
        return res.status(200).send({ data });
    }
    catch (e) {
        // Asegurarse de que el error sea de tipo Error
        if (e instanceof Error) {
            return res.status(500).send({ error: 'ERROR_GET_ITEMS', message: e.message });
        }
        return res.status(500).send({ error: 'ERROR_GET_ITEMS' });
    }
}
// Obtener un item por ID
async function getItem(req, res) {
    try {
        const { id } = req.params;
        const data = await e42_1.default.findOne({ _id: id });
        if (!data) {
            return res.status(404).send({ error: 'ITEM_NOT_FOUND' });
        }
        return res.status(200).send({ data });
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(500).send({ error: 'ERROR_GET_ITEMS', message: e.message });
        }
        return res.status(500).send({ error: 'ERROR_GET_ITEMS' });
    }
}
async function createItem(req, res) {
    try {
        // Limpiar los datos con matchedData
        const body = (0, express_validator_1.matchedData)(req);
        // Validar los datos requeridos
        if (!body.user || !body.password) {
            return res.status(400).send({ error: 'DATOS_REQUERIDOS_INCOMPLETOS' });
        }
        // Crear el item en la base de datos
        const data = await e42_1.default.create(body);
        return res.status(201).send({ data });
    }
    catch (e) {
        if (e instanceof Error) {
            console.error("Error creating item:", e.message); // Log para error detallado
            (0, handleError_1.handleHttpError)(res, 'ERROR_CREATE_ITEM');
            return res.status(500).send({ error: 'ERROR_CREATE_ITEM', message: e.message });
        }
        (0, handleError_1.handleHttpError)(res, 'ERROR_CREATE_ITEM');
        return res.status(500).send({ error: 'ERROR_CREATE_ITEM' });
    }
}
// Actualizar un item
async function updateItem(req, res) {
    try {
        const { id } = req.params;
        const body = req.body.data;
        if (!id) {
            return res.status(400).send({ error: 'ID_NOT_PROVIDED' });
        }
        delete body._id; // Eliminar _id para evitar cambios no deseados
        const data = await e42_1.default.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
        if (!data) {
            return res.status(404).send({ error: 'ITEM_NOT_FOUND' });
        }
        return res.status(200).send({ data });
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(500).send({ error: 'ERROR_UPDATE_ITEM', message: e.message });
        }
        return res.status(500).send({ error: 'ERROR_UPDATE_ITEM' });
    }
}
// Eliminar un item
async function deleteItem(req, res) {
    try {
        const { id } = req.params;
        const deleteResponse = await e42_1.default.deleteOne({ _id: id });
        if (deleteResponse.deletedCount === 0) {
            return res.status(404).send({ error: 'ITEM_NOT_FOUND' });
        }
        const data = { deleted: deleteResponse.deletedCount };
        return res.status(200).send({ data });
    }
    catch (e) {
        (0, handleError_1.handleHttpError)(res, "ERROR_DELETE_ITEM");
        return res.status(500).send({ error: 'ERROR_DELETE_ITEM' });
    }
}
