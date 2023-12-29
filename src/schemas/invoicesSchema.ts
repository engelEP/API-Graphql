const invoiceSchema = `#graphql
    type Invoice {
        id: ID
        seller: Seller!
        customer: Customer!
        date: String!
        total: Float!
    }

    input InvoiceCreate {
        sellerId: Int!
        customerId: Int!
        date: String!
        total: Float!
    }

    input InvoiceUpdate {
        sellerId: Int
        customerId: Int
        date: String
        total: Float
    }

    type Query {
        invoicesGet: [Invoice]
        invoiceGetById(id: Int!): Invoice
    }

    type Mutation {
        invoiceCreate(input: InvoiceCreate!): Invoice
        invoiceUpdate(id: Int!, input: InvoiceUpdate!): Invoice
        invoiceDelete(id: Int!): ResponseGraphql
    }
`

export { invoiceSchema };