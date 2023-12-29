import { AppDataSource } from "../data-source"
import { Customer } from "../entity/customer.entity"
import { ResponseGraphql } from "../utils/ResponseGraphql";

const customersGet = async (): Promise<Customer[]> => {
    const customers: Customer[] = await AppDataSource
        .getRepository(Customer)
        .find();
    
    return customers;
}

const customerGetById = async (args: { id: number }): Promise<Customer> => {
    const { id } = args;
    const customer = await AppDataSource
        .getRepository(Customer)
        .findOne({
            where: { id }
        });

    return customer;
}

const customerCreate = async (args: { input: Customer }): Promise<Customer> => {
    const { input } = args;
    const customer = AppDataSource.getRepository(Customer).create(input);

    return await AppDataSource.getRepository(Customer).save(customer);
}

const customerUpdate = async (args: { id: number, input: Customer }): Promise<Customer> => {
    const { id, input } = args;
    await AppDataSource.getRepository(Customer).update(id, input);

    const customer = await AppDataSource.getRepository(Customer).findOne({
        where: { id }
    });

    return customer;
}

const customerDelete = async (args: { id: number }): Promise<ResponseGraphql> => {
    const { id } = args;
    const deleteCustomer = await AppDataSource.getRepository(Customer).delete(id);

    if(deleteCustomer.affected)
        return {
            Id: id,
            Successfully: true
        };

    return {
        Id: id,
        Successfully: false
    };
}

export const customerResolvers = {
    customersGet,
    customerGetById,
    customerCreate,
    customerUpdate,
    customerDelete
}
