import { Request } from "express";

interface PaginationConfig {
  page?: number;
  pageSize?: number;
  orderBy?: {
    [key: string]: 'asc' | 'desc';
  };
}

export const paginationConfig = (req: Request): PaginationConfig => {
  const { page, pageSize, orderField, orderDirection } = req.query;

  const config: PaginationConfig = {};

  if (page && typeof page === 'string') {
    config.page = parseInt(page, 10);
  }

  if (pageSize && typeof pageSize === 'string') {
    config.pageSize = parseInt(pageSize, 10);
  }

  if (orderField && typeof orderField === 'string') {
    const direction = orderDirection === 'desc' ? 'desc' : 'asc';
    config.orderBy = { [orderField]: direction };
  }

  return config;
};
