const sellerSchema = `#graphql
    type Seller {
        id: ID
        name: String!
        lastName: String!
    }

    input SellerCreate {
        name: String!
        lastName: String!
    }

    input SellerUpdate {
        name: String
        lastName: String
    }

    type Query {
        sellersGet: [Seller]
        sellerGetById(id: Int!): Seller
    }

    type Mutation {
        sellerCreate(input: SellerCreate!): Seller
        sellerUpdate(id: Int!, input: SellerUpdate!): Seller
        sellerDelete(id: Int!): ResponseGraphql
    }
`;

export { sellerSchema }
