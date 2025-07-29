import prisma from "../../../../config/prisma.config";
import { select, data, updateData, filterData, searchFields } from "./config";
import * as createServices from "../../../../utils/services/index"

const modelName = "PRODUCT";
const prismaModel = prisma.product;

export const create = createServices.create({ modelName, prismaModel, data });

export const getAll = createServices.getAll({ modelName, prismaModel, select, searchFields });

export const getById = createServices.getById({ modelName, prismaModel, select });

export const getByFilters = createServices.getByFilters({ modelName, prismaModel, filterData, select });

export const editById = createServices.editById({ modelName, prismaModel, updateData, select });

export const deleteById = createServices.deleteById({ modelName, prismaModel, select });
