import { AppDataSource } from "../data-source";
import { Product } from "../entity/product.entity";
import { ResponseGraphql } from "../utils/ResponseGraphql";

const productGet = async (): Promise<Product[]> => {
    const products: Product[] = await AppDataSource
        .getRepository(Product)
        .find();

    return products;
};

const productGetById = async (args: { id: number }): Promise<Product> => {
    const { id } = args;

    const product: Product = await AppDataSource
        .getRepository(Product)
        .findOne({
            where: { id }
        })

    return product;
}

const productCreate = async (args: { input: Product }): Promise<Product> => {
    const { input } = args;

    const product = AppDataSource.getRepository(Product).create(input);

    return await AppDataSource
        .getRepository(Product)
        .save(product);
}

const productUpdate = async (args: {id: number,  input: Product }): Promise<Product> => {
    const { id, input } = args;

    await AppDataSource.getRepository(Product).update(id, input);

    const product = await AppDataSource
        .getRepository(Product)
        .findOne({
            where: { id }
        });

    return product;
}

const productDelete = async (args: { id: number }): Promise<ResponseGraphql> => {
    const { id } = args;
    const deleteProduct = await AppDataSource.getRepository(Product).delete(id);

    if(deleteProduct.affected)
        return {
            Id: id,
            Successfully: true
        };

    return {
        Id: id,
        Successfully: false
    };
}

export const productResolvers = {
    productGet,
    productGetById,
    productCreate,
    productUpdate,
    productDelete
};
