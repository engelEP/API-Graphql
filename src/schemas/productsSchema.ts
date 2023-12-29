const productSchema = `#graphql
    type Product {
        id: ID
        name: String!
        description: String!
        unitOfMeasure: String!
        price: Float!
        stock: Float!
    }

    input ProductInputCreate {
        name: String!
        description: String!
        unitOfMeasure: String!
        price: Float!
        stock: Float!
    }

    input ProductInputUpdate {
        name: String
        description: String
        unitOfMeasure: String
        price: Float
        stock: Float
    }

    type Query {
        productGet: [Product]
        productGetById(id: Int!): Product
    }

    type Mutation {
        productCreate(input: ProductInputCreate!): Product
        productUpdate(id: Int!, input: ProductInputUpdate!): Product
        productDelete(id: Int!): ResponseGraphql
    }
`;

export { productSchema }