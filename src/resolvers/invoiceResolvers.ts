import { AppDataSource } from "../data-source";
import { Customer } from "../entity/customer.entity";
import { Invoice } from "../entity/invoice.entity";
import { Seller } from "../entity/seller.entity";
import { GraphQLError } from "graphql";
import { ResponseGraphql } from "../utils/ResponseGraphql";

type InvoiceType = {
    id: number;
    sellerId: number;
    customerId: number;
    date: Date;
    total: number;
}

const invoicesGet = async (): Promise<Invoice[]> => {
    const invoice = await AppDataSource.getRepository(Invoice).find({
        relations: {
            customer: true,
            seller: true
        }
    });
    
    return invoice;
}

const invoiceGetById = async (args: { id: number }): Promise<Invoice> => {
    const { id } = args;

    const customer = await AppDataSource.getRepository(Invoice).findOne({
        where: { id },
        relations: {
            customer: true,
            seller: true
        }
    });

    return customer;
}

const invoiceCreate = async (args: { input: InvoiceType }): Promise<Invoice> => {
    const { input: { customerId, sellerId, date, ...rest } } = args;

    const customer = await AppDataSource
        .getRepository(Customer)
        .findOneBy({ id: customerId });
    
    const seller = await AppDataSource
        .getRepository(Seller)
        .findOneBy({ id: sellerId });

    if (!customer) 
        throw new GraphQLError('Customer not found');

    if (!seller)
        throw new GraphQLError('Seller not found');

    const dateCovert: Date = new Date(date);

    const invoice = AppDataSource.getRepository(Invoice).create({
        ...rest,
        date: dateCovert,
        customer,
        seller
    });

    return await AppDataSource.getRepository(Invoice).save(invoice);
}

const invoiceUpdate = async (args: { id: number, input: InvoiceType }): Promise<Invoice> => {
    const { id, input: { customerId, sellerId, date, ...rest } } = args;
    const invoice = await AppDataSource.getRepository(Invoice).findOne({
        where: { id },
        relations: {
            customer: true,
            seller: true
        }
    });

    let customer;
    let seller;

    if (!invoice) 
        throw new GraphQLError('Customer not found');
    
    invoice.date = date ? new Date(date) : invoice.date;

    if(customerId) {
        customer = await AppDataSource.getRepository(Customer).findOneBy({ id: customerId }); 
        if (!customer) 
            throw new GraphQLError('Customer not found');
    }

    if(sellerId) {
        seller = await AppDataSource.getRepository(Seller).findOneBy({ id: sellerId }); 
        if (!seller)
            throw new GraphQLError('Seller not found');
    }

    await AppDataSource.getRepository(Invoice).update(id, {
        ...invoice,
        ...rest,
        customer,
        seller,
    });

    return await AppDataSource.getRepository(Invoice).findOne({
        where: { id },
        relations: {
            customer: true,
            seller: true,
        }
    });
}

const invoiceDelete = async (args: { id: number }): Promise<ResponseGraphql> => {
    const { id } = args;

    const deleteInvoice = await AppDataSource.getRepository(Invoice).delete(id);

    if(deleteInvoice.affected)
        return {
            Id: id,
            Successfully: true
        };
    
    return {
        Id: id,
        Successfully: false
    };
}

export const invoiceResolvers = {
    invoicesGet,
    invoiceGetById,
    invoiceCreate,
    invoiceUpdate,
    invoiceDelete
} 