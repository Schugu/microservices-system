import { Request, Response } from "express";
import * as usersServices from "../../services";
import { writeLog } from '../../../../utils/logs'
import { handleErrorResponse } from "../../../../utils/handleErrorResponse";
import { paginationConfig } from "../../../../utils/paginationConfig";

export const controllerName = "GET_BY_FILTERS_" + "USERS" + "_DATA_CONTROLLER";

export const getByFilters = async (req: Request, res: Response): Promise<void> => {
  try {
    const pagConfig = paginationConfig(req);

    const result = await usersServices.user.getByFilters(req.body, pagConfig);
    if (!result) return handleErrorResponse(res, 403, `No se aplicaron filtros o no se encontraron resultados.`);

    res.status(200).json(result);
  } catch (error) {
    writeLog({ controllerName, error });
    handleErrorResponse(res, 500, "Error interno del servidor.");
  }
};