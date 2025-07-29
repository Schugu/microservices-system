import { ServiceError } from "../logs/serviceError";

type GetByFiltersOptions<TFilters, TResult = any> = {
  modelName: string;
  prismaModel: any;
  filterData: (filters: TFilters) => any[];
  select?: any;
  include?: any;
  useOR?: boolean;
};

type FiltersPaginationParams = {
  page?: number;
  pageSize?: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
};

type FiltersResult<T> = {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
  filtersApplied: boolean;
};

export function getByFilters<TFilters, TResult = any>({
  modelName,
  prismaModel,
  filterData,
  select,
  include,
  useOR = false,
}: GetByFiltersOptions<TFilters, TResult>) {
  return async (
    filters: TFilters,
    paginationParams?: FiltersPaginationParams
  ): Promise<FiltersResult<TResult> | null> => {
    try {
      const filterConditions = filterData(filters);

      if (filterConditions.length === 0) {
        return null;
      }

      const page = paginationParams?.page ?? 1;
      const pageSize = paginationParams?.pageSize ?? 10;
      const skip = (page - 1) * pageSize;

      const whereClause = useOR
        ? { OR: filterConditions }
        : { AND: filterConditions };

      const data = await prismaModel.findMany({
        where: whereClause,
        ...(select && { select }),
        ...(include && { include }),
        skip,
        take: pageSize,
        ...(paginationParams?.orderBy && { orderBy: paginationParams.orderBy }),
      });

      // Contar total de resultados que coinciden con los filtros
      const total = await prismaModel.count({
        where: whereClause,
      });

      // Si no hay resultados, retornar null
      if (total === 0) {
        return null;
      }

      const totalPages = Math.ceil(total / pageSize);

      return {
        data,
        total,
        totalPages,
        currentPage: page,
        filtersApplied: true,
      };
    } catch (error) {
      const serviceName = `GET_BY_FILTERS_${modelName.toUpperCase()}_SERVICE`;
      throw new ServiceError(serviceName, "obtener los registros por filtros", error);
    }
  };
}