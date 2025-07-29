import { ServiceError } from "../logs/serviceError";

type getAllOptions<T, U = undefined> = {
  modelName: string;
  prismaModel: any;
  select: T;
  include?: U;
  searchFields?: string[];
};

type PaginationByPage = {
  page?: number;
  pageSize?: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
  search?: string;
};

type PaginatedResult<T> = {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
  searchTerm?: string;
};

export function getAll<T, U = undefined>({
  modelName,
  prismaModel,
  select,
  include,
  searchFields = [],
}: getAllOptions<T, U>) {
  return async (paginationParams?: PaginationByPage): Promise<PaginatedResult<T>> => {
    try {
      const page = paginationParams?.page ?? 1;
      const pageSize = paginationParams?.pageSize ?? 10;
      const searchTerm = paginationParams?.search?.trim();

      const skip = (page - 1) * pageSize;

      let whereClause = {};
      if (searchTerm && searchFields.length > 0) {
        const lowerSearchTerm = searchTerm.toLowerCase();

        whereClause = {
          OR: searchFields.map((field) => ({
            [field]: {
              contains: lowerSearchTerm,
            },
          })),
        };
      }

      const data = await prismaModel.findMany({
        ...(Object.keys(whereClause).length > 0 && { where: whereClause }),
        select,
        ...(include && { include }),
        skip,
        take: pageSize,
        ...(paginationParams?.orderBy && { orderBy: paginationParams.orderBy }),
      });

      const total = await prismaModel.count({
        ...(Object.keys(whereClause).length > 0 && { where: whereClause }),
      });

      const totalPages = Math.ceil(total / pageSize);

      return {
        data,
        total,
        totalPages,
        currentPage: page,
        ...(searchTerm && { searchTerm }),
      };
    } catch (error) {
      const serviceName = `GET_ALL_${modelName.toUpperCase()}_SERVICE`;
      throw new ServiceError(serviceName, "obtener los registros", error);
    }
  };
}