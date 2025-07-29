import { Request, Response } from "express";
import * as productsServices from "../../services";
import { handleErrorResponse } from "../../../../utils/handleErrorResponse";
import { writeLog } from '../../../../utils/logs'
import { validateUUID } from "../../../../utils/uuidValidator";

export const controllerName = "EDIT_BY_ID_" + "PRODUCT" + "_DATA_CONTROLLER";

export const editById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!validateUUID(id, res)) return;

    if (!req.body || Object.keys(req.body).length === 0) {
      return handleErrorResponse(res, 400, "Debe enviar al menos un campo para actualizar.");
    };

    if (!(await productsServices.product.getById({ id }))) {
      return handleErrorResponse(res, 404, `El producto con el id: ${id} no existe.`);
    };

    if (await productsServices.product.getByFilters({ name })) {
      return handleErrorResponse(res, 403, `El producto ya existe.`);
    };

    const result = await productsServices.product.editById({ id, ...req.body });
    if (!result) return handleErrorResponse(res, 409, `Error al editar el producto.`);

    res.status(200).json({
      message: "Producto editado exitosamente.",
      product: result,
    });
  } catch (error) {
    writeLog({ controllerName, error });
    handleErrorResponse(res, 500, "Error interno del servidor.");
  };
};