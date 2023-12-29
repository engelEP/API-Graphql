const customerSchema = `#graphql
    type Customer {
        id: ID
        name: String!
        lastName: String!
        address: String!
        phone: Int!
    }

    input CustomerCreate {
        name: String!
        lastName: String!
        address: String!
        phone: Int!
    }

    input CustomerUpdate {
        name: String
        lastName: String
        address: String
        phone: Int
    }

    type Query {
        customersGet: [Customer]
        customerGetById(id: Int!): Customer
    }

    type Mutation {
        customerCreate(input: CustomerCreate!): Customer
        customerUpdate(id: Int!, input: CustomerUpdate!): Customer
        customerDelete(id: Int!): ResponseGraphql
    }
`

export { customerSchema };