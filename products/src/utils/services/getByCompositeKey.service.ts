import { ServiceError } from "../logs/serviceError";

// Config para composite key
type PrimaryKeyConfig = {
  primaryKeyFields: readonly string[];
  compositeKeyName: string;
};

// Tipo de opciones para la función
type GetByCompositeKeyOptions<T, U = undefined> = {
  modelName: string;
  prismaModel: any;
  select: T;
  include?: U;
  primaryKeyConfig: PrimaryKeyConfig;
};

export function getByCompositeKey<T, U = undefined>({
  modelName,
  prismaModel,
  select,
  include,
  primaryKeyConfig,
}: GetByCompositeKeyOptions<T, U>) {
  const { primaryKeyFields, compositeKeyName } = primaryKeyConfig;

  return async (whereClause: Record<string, any>) => {
    try {
      const result = await prismaModel.findUnique({
        where: {
          [compositeKeyName]: whereClause,
        },
        select,
        ...(include && { include }),
      });

      return result || null;
    } catch (error) {
      const serviceName = `GET_BY_COMPOSITE_KEY_${modelName.toUpperCase()}_SERVICE`;
      throw new ServiceError(serviceName, "obtener el registro por clave compuesta", error);
    }
  };
}
