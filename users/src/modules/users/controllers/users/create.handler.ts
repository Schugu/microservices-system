import { Request, Response } from "express";
import * as usersServices from "../../services";
import { handleErrorResponse } from "../../../../utils/handleErrorResponse";
import { writeLog } from '../../../../utils/logs'

export const controllerName = "CREATE_" + "USER" + "_DATA_CONTROLLER";

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, numberPhone } = req.body;

    if (!username && !email && !numberPhone) {
      return handleErrorResponse(res, 403, `El usuario debe tener un usuario, un correo o un numero de telefono.`);
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

    const result = await usersServices.user.create(req.body);
    if (!result) return handleErrorResponse(res, 409, `Error al crear el usuario.`);

    res.status(200).json({
      message: "Usuario creado exitosamente.",
      user: result,
    });
  } catch (error) {
    writeLog({ controllerName, error });
    handleErrorResponse(res, 500, "Error interno del servidor.");
  };
};
