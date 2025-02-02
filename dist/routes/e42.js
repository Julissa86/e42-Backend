"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const e42_1 = require("../utils/e42");
const e42_2 = require("../controllers/e42");
router.get("/", e42_2.getItems);
router.get("/:id", e42_2.getItem);
router.post("/", e42_1.validateCreateItem, e42_1.validateErrors, e42_2.createItem); // Agregamos validateErrors
router.patch("/:id", e42_2.updateItem);
router.delete("/:id", e42_2.deleteItem);
