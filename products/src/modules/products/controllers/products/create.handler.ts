import { Request, Response } from "express";
import * as productsServices from "../../services";
import { handleErrorResponse } from "../../../../utils/handleErrorResponse";
import { writeLog } from '../../../../utils/logs'

export const controllerName = "CREATE_" + "PRODUCT" + "_DATA_CONTROLLER";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;

    if (await productsServices.product.getByFilters({ name })) {
      return handleErrorResponse(res, 403, `El producto ya existe.`);
    };

    const result = await productsServices.product.create(req.body);
    if (!result) return handleErrorResponse(res, 409, `Error al crear el producto.`);

    res.status(200).json({
      message: "Producto creado exitosamente.",
      product: result,
    });
  } catch (error) {
    writeLog({ controllerName, error });
    handleErrorResponse(res, 500, "Error interno del servidor.");
  };
};
