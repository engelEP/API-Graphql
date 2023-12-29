import { AppDataSource } from "../data-source";
import { Seller } from "../entity/seller.entity";
import { ResponseGraphql } from "../utils/ResponseGraphql";

const sellersGet = async (): Promise<Seller[]> => {
    const sellers: Seller[] = await AppDataSource
        .getRepository(Seller)
        .find();

    return sellers;
};

const sellerGetById = async (args: { id: number }): Promise<Seller> => {
    const { id } = args;
    const seller: Seller = await AppDataSource.getRepository(Seller)
        .findOne({
            where: { id }
        });
    
    return seller;
}

const sellerCreate = async (args: { input: Seller }): Promise<Seller> => {
    const { input } = args;
    const seller = AppDataSource.getRepository(Seller).create(input);

    return await AppDataSource.getRepository(Seller).save(seller);
}

const sellerUpdate = async (args: { id: number, input: Seller}): Promise<Seller> => {
    const { id, input } = args;
    await AppDataSource.getRepository(Seller).update(id, input);
    
    const seller = await AppDataSource.getRepository(Seller).findOne({
        where: { id }
    });

    return seller;
}

const sellerDelete = async (args: { id: number }): Promise<ResponseGraphql> => {
    const { id } = args;

    const deleteSeller = await AppDataSource.getRepository(Seller).delete(id);

    if(deleteSeller.affected)
        return {
            Id: id,
            Successfully: true
        };

    return {
        Id: id,
        Successfully: false
    };
}

export const sellerResolvers = {
    sellersGet,
    sellerGetById,
    sellerCreate,
    sellerUpdate,
    sellerDelete
}
