import { GraphQLError } from "graphql";
import { AppDataSource } from "../data-source";
import { InvoiceDetail } from "../entity/invoice-detail.entity";
import { Invoice } from "../entity/invoice.entity";
import { Product } from "../entity/product.entity";
import { ResponseGraphql } from "../utils/ResponseGraphql";

type InvoiceDetailType = {
    invoiceId: number;
    productId: number;
    quantity: number;
    price: number;
}

const invoiceDetailsGet = async (): Promise<InvoiceDetail[]> => {
    const invoiceDetails = await AppDataSource
        .getRepository(InvoiceDetail)
        .find({
            relations: {
                invoice: {
                    customer: true,
                    seller: true,
                },
                product: true
            }
        });
    
    return invoiceDetails;
}

const invoiceDetailsGetById = async (args: { id: number }): Promise<InvoiceDetail> => {
    const { id } = args;
    const invoiceDetail = await AppDataSource
        .getRepository(InvoiceDetail)
        .findOne({
            where: { id },
            relations: {
                invoice: {
                    customer: true,
                    seller: true,
                },
                product: true
            }
        });
    return invoiceDetail;
}

const invoiceDetailsCreate = async (args: { input: InvoiceDetailType }): Promise<InvoiceDetail> => {
    const { input: { productId, invoiceId, ...rest } } = args;

    const invoice = await AppDataSource.getRepository(Invoice).findOne({
        where: { id: invoiceId },
        relations: {
            customer: true,
            seller: true
        }
    });

    const product = await AppDataSource.getRepository(Product).findOne({
        where: { id: productId }
    });

    if(!invoice)
        throw new GraphQLError('Invoice not found');
    if(!product)
        throw new GraphQLError('Product not found');

    const invoiceDetails = AppDataSource
        .getRepository(InvoiceDetail)
        .create({
            ...rest,
            invoice,
            product
        });

    return await AppDataSource.getRepository(InvoiceDetail).save(invoiceDetails);
    
}

const invoiceDetailsUpdate = async (args: { id: number, input: InvoiceDetailType }): Promise<InvoiceDetail> => {
    const { id, input: { invoiceId, productId, ...rest } } = args;
    const invoiceDetail = await AppDataSource.getRepository(InvoiceDetail).findOne({
        where: { id },
        relations: {
            invoice: {
                customer: true,
                seller: true,
            },
            product: true
        }
    });

    let product;
    let invoice;

    if(!invoiceDetail)
        throw new GraphQLError('Invoice Details not found');

    if(productId) {
        product = await AppDataSource.getRepository(Product).findOne({
            where: { id: productId } 
        });

        if(!product)
            throw new GraphQLError('Product not found');
    }

    if(invoiceId) {
        invoice = await AppDataSource.getRepository(Invoice).findOne({
            where: { id: invoiceId },
            relations: {
                customer: true,
                seller: true
            }
        });

        if(!invoice)
            throw new GraphQLError('Invoice not found');
    }

    await AppDataSource.getRepository(InvoiceDetail).update(id, {
        ...invoiceDetail,
        ...rest,
        invoice,
        product
    });

    return await AppDataSource.getRepository(InvoiceDetail).findOne({
        where: { id },
        relations: {
            invoice: {
                customer: true,
                seller: true,
            },
            product: true
        }
    });
}

const invoiceDetailsDelete = async (args: { id: number }): Promise<ResponseGraphql> => {
    const { id } = args;
    const deleteInvoiceDetails = await AppDataSource.getRepository(InvoiceDetail).delete(id);

    if(deleteInvoiceDetails.affected)
        return {
            Id: id,
            Successfully: true
        };
    
    return {
        Id: id,
        Successfully: false
    };
}

export const invoiceDetailsResolvers = {
    invoiceDetailsGet,
    invoiceDetailsGetById,
    invoiceDetailsCreate,
    invoiceDetailsUpdate,
    invoiceDetailsDelete
}
