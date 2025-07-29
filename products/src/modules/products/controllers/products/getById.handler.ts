import { Request, Response } from "express";
import * as usersServices from "../../services";
import { writeLog } from '../../../../utils/logs'
import { validateUUID } from "../../../../utils/uuidValidator";
import { handleErrorResponse } from "../../../../utils/handleErrorResponse";

export const controllerName = "GET_BY_ID_" + "PRODUCT" + "_DATA_CONTROLLER";

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!validateUUID(id, res)) return;

    const result = await usersServices.product.getById({ id });
    if (!result) return handleErrorResponse(res, 404, `El producto con el id: ${id} no existe.`);

    res.status(201).json(result);
  } catch (error) {
    writeLog({ controllerName, error });
    handleErrorResponse(res, 500, "Error interno del servidor.");
  };
};
