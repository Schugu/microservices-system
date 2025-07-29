import { Request, Response } from "express";
import * as usersServices from "../../services";
import { handleErrorResponse } from "../../../../utils/handleErrorResponse";
import { writeLog } from '../../../../utils/logs'
import { validateUUID } from "../../../../utils/uuidValidator";

export const controllerName = "EDIT_BY_ID_" + "USER" + "_DATA_CONTROLLER";

export const editById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { username, email, numberPhone } = req.body;

    if (!validateUUID(id, res)) return;

    if (!req.body || Object.keys(req.body).length === 0) {
      return handleErrorResponse(res, 400, "Debe enviar al menos un campo para actualizar.");
    };

    if (!(await usersServices.user.getById({ id }))) {
      return handleErrorResponse(res, 404, `El usuario con el id: ${id} no existe.`);
    };

    if (username && await usersServices.user.getByFilters({ username })) {
      return handleErrorResponse(res, 403, `El nombre de usuario ${username} ya existe.`);
    };
    if (email && await usersServices.user.getByFilters({ email })) {
      return handleErrorResponse(res, 403, `El email ${email} ya está en uso.`);
    };
    if (numberPhone && await usersServices.user.getByFilters({ numberPhone })) {
      return handleErrorResponse(res, 403, `El número de teléfono ${numberPhone} ya está en uso.`);
    };

    const result = await usersServices.user.editById({ id, ...req.body });
    if (!result) return handleErrorResponse(res, 409, `Error al editar el usuario.`);

    res.status(200).json({
      message: "Usuario editado exitosamente.",
      user: result,
    });
  } catch (error) {
    writeLog({ controllerName, error });
    handleErrorResponse(res, 500, "Error interno del servidor.");
  };
};