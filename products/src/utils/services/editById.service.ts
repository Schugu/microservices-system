import { ServiceError } from "../logs/serviceError";

type EditByIdOptions<TInput, TResult = any> = {
  modelName: string;
  prismaModel: {
    update: (args: { where: { id: any }; data: any; select?: any; include?: any }) => Promise<TResult>;
  };
  updateData: (input: TInput) => any;
  select?: any;
  include?: any;
};

export function editById<TInput, TResult = any>({
  modelName,
  prismaModel,
  updateData,
  select,
  include,
}: EditByIdOptions<TInput, TResult>) {
  return async (input: TInput): Promise<TResult | null> => {
    try {
      const data = await updateData(input); 
      
      const result = await prismaModel.update({
        where: { id: (input as any).id },
        data,
        ...(select && { select }),
        ...(include && { include }),
      });
      
      return result || null;
    } catch (error) {
      const serviceName = `EDIT_BY_ID_${modelName.toUpperCase()}_SERVICE`;
      throw new ServiceError(serviceName, "editar el registro", error);
    }
  };
}
