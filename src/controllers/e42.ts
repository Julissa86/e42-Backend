import { Request, Response } from "express";
import InfoSchema from "../models/e42"; // Asegúrate de que el modelo esté bien importado
import { matchedData } from "express-validator";
import { handleHttpError } from "../utils/handleError";

// Obtener todos los items
async function getItems(req: Request, res: Response): Promise<Response> {
  try {
    const data = await InfoSchema.find();
    return res.status(200).send({ data });
  } catch (e: unknown) {
    // Asegurarse de que el error sea de tipo Error
    if (e instanceof Error) {
      return res.status(500).send({ error: 'ERROR_GET_ITEMS', message: e.message });
    }
    return res.status(500).send({ error: 'ERROR_GET_ITEMS' });
  }
}

// Obtener un item por ID
async function getItem(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const data = await InfoSchema.findOne({ _id: id });
    if (!data) {
      return res.status(404).send({ error: 'ITEM_NOT_FOUND' });
    }
    return res.status(200).send({ data });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(500).send({ error: 'ERROR_GET_ITEMS', message: e.message });
    }
    return res.status(500).send({ error: 'ERROR_GET_ITEMS' });
  }
}


async function createItem(req: Request, res: Response): Promise<Response> {
  try {
    // Limpiar los datos con matchedData
    const body = matchedData(req);

    // Validar los datos requeridos
    if (!body.user || !body.password) {
      return res.status(400).send({ error: 'DATOS_REQUERIDOS_INCOMPLETOS' });
    }

    // Crear el item en la base de datos
    const data = await InfoSchema.create(body);
    return res.status(201).send({ data });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("Error creating item:", e.message); // Log para error detallado
      handleHttpError(res, 'ERROR_CREATE_ITEM');
      return res.status(500).send({ error: 'ERROR_CREATE_ITEM', message: e.message });
    }
    handleHttpError(res, 'ERROR_CREATE_ITEM');
    return res.status(500).send({ error: 'ERROR_CREATE_ITEM' });
  }
}


// Actualizar un item
async function updateItem(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const body = req.body.data;

    if (!id) {
      return res.status(400).send({ error: 'ID_NOT_PROVIDED' });
    }

    delete body._id; // Eliminar _id para evitar cambios no deseados

    const data = await InfoSchema.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );

    if (!data) {
      return res.status(404).send({ error: 'ITEM_NOT_FOUND' });
    }

    return res.status(200).send({ data });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(500).send({ error: 'ERROR_UPDATE_ITEM', message: e.message });
    }
    return res.status(500).send({ error: 'ERROR_UPDATE_ITEM' });
  }
}

// Eliminar un item
async function deleteItem(req: Request<{ id: string }>, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const deleteResponse = await InfoSchema.deleteOne({ _id: id });

    if (deleteResponse.deletedCount === 0) {
      return res.status(404).send({ error: 'ITEM_NOT_FOUND' });
    }

    const data = { deleted: deleteResponse.deletedCount };
    return res.status(200).send({ data });
  } catch (e: unknown) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
    return res.status(500).send({ error: 'ERROR_DELETE_ITEM' });
  }
}

export { getItems, createItem, updateItem, deleteItem, getItem };
