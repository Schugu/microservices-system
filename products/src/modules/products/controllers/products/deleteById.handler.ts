import { Request, Response } from "express";
import * as productsServices from "../../services";
import { writeLog } from '../../../../utils/logs'
import { validateUUID } from "../../../../utils/uuidValidator";
import { handleErrorResponse } from "../../../../utils/handleErrorResponse";

export const controllerName = "DELETE_BY_ID_" + "PRODUCT" + "_DATA_CONTROLLER";

export const deleteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!validateUUID(id, res)) return;

    if (!(await productsServices.product.getById({ id }))) {
      return handleErrorResponse(res, 404, `El producto con el id: ${id} no existe.`);
    };

    const result = await productsServices.product.deleteById({ id });
    if (!result) return handleErrorResponse(res, 404, `Error al eliminar el producto.`);

    res.status(200).json({
      message: "Producto eliminado exitosamente.",
      product: result,
    });
  } catch (error) {
    writeLog({ controllerName, error });
    handleErrorResponse(res, 500, "Error interno del servidor.");
  };
};
