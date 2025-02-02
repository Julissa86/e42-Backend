import express from "express";
const router = express.Router();
import { validateCreateItem, validateErrors} from "../utils/e42";
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/e42";

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", validateCreateItem, validateErrors, createItem); // Agregamos validateErrors
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

export {router};