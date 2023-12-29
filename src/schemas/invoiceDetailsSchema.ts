const invoiceDetailsSchema = `#graphql
    type InvoiceDetails {
        id: ID
        invoice: Invoice!
        product: Product!
        quantity: Float!
        price: Float!
    }

    input InvoiceDetailsCreate {
        invoiceId: Int!
        productId: Int!
        quantity: Float!
        price: Float!
    }

    input InvoiceDetailsUpdate {
        invoiceId: Int
        productId: Int
        quantity: Float
        price: Float
    }

    type Query {
        invoiceDetailsGet: [InvoiceDetails]
        invoiceDetailsGetById(id: Int!): InvoiceDetails
    }

    type Mutation {
        invoiceDetailsCreate(input: InvoiceDetailsCreate!): InvoiceDetails
        invoiceDetailsUpdate(id: Int!, input: InvoiceDetailsUpdate!): InvoiceDetails
        invoiceDetailsDelete(id: Int!): ResponseGraphql
    }
`
export { invoiceDetailsSchema };