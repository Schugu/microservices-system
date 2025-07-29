import { ServiceError } from "../logs/serviceError";

type CreateServiceOptions<TInput, TResult = any> = {
  modelName: string;
  prismaModel: {
    create: (args: { data: any; select?: any; include?: any }) => Promise<TResult>;
  };
  data: (input: TInput) => any; 
  select?: any; 
  include?: any;
};

export function create<TInput, TResult = any>({
  modelName,
  prismaModel,
  data,
  select,
  include,
}: CreateServiceOptions<TInput, TResult>) {
  return async (input: TInput): Promise<TResult | null> => {
    try {
      const result = await prismaModel.create({
        data: await data(input),
        ...(select && { select }),
        ...(include && { include }),
      });

      return result || null;
    } catch (error) {
      const serviceName = `CREATE_${modelName.toUpperCase()}_SERVICE`;
      throw new ServiceError(serviceName, "crear el registro", error);
    }
  };
}