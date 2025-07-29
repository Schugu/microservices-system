import { Request, Response } from "express";
import * as usersServices from "../../services";
import { writeLog } from '../../../../utils/logs'
import { handleErrorResponse } from "../../../../utils/handleErrorResponse";
import { paginationConfig } from "../../../../utils/paginationConfig";

export const controllerName = "GET_ALL_" + "PRODUCTS" + "_DATA_CONTROLLER";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search as string;

    const pagConfig = paginationConfig(req);

    const result = await usersServices.product.getAll({ search, ...pagConfig });
    res.status(200).json(result ?? []);
  } catch (error) {
    writeLog({ controllerName, error });
    handleErrorResponse(res, 500, "Error interno del servidor.");
  }
};