import { customerSchema } from './customersSchema';
import { invoiceSchema } from './invoicesSchema';
import { productSchema } from './productsSchema';
import { sellerSchema } from './sellersSchema';
import { invoiceDetailsSchema } from './invoiceDetailsSchema';
import { mergeSchemas } from '@graphql-tools/schema';

const responseGraphql = `#graphql
    type ResponseGraphql {
        Id: Int!
        Successfully: Boolean!
    }
`

const schema = mergeSchemas({
    typeDefs: [
        responseGraphql,
        productSchema,
        sellerSchema,
        customerSchema,
        invoiceSchema,
        invoiceDetailsSchema
    ]
});

export { schema }