import { Request, Response } from "express";
import * as usersServices from "../../services";
import { writeLog } from '../../../../utils/logs'
import { validateUUID } from "../../../../utils/uuidValidator";
import { handleErrorResponse } from "../../../../utils/handleErrorResponse";

export const controllerName = "DELETE_BY_ID_" + "USER" + "_DATA_CONTROLLER";

export const deleteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!validateUUID(id, res)) return;

    if (!(await usersServices.user.getById({ id }))) {
      return handleErrorResponse(res, 404, `El usuario con el id: ${id} no existe.`);
    };

    const result = await usersServices.user.deleteById({ id });
    if (!result) return handleErrorResponse(res, 404, `Error al eliminar el usuario.`);

    res.status(200).json({
      message: "Usuario eliminado exitosamente.",
      user: result,
    });
  } catch (error) {
    writeLog({ controllerName, error });
    handleErrorResponse(res, 500, "Error interno del servidor.");
  };
};
