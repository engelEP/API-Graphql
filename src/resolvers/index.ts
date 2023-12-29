import { productResolvers } from './productResolvers';
import { sellerResolvers } from './sellerResolvers';
import { customerResolvers } from './customerResolvers';
import { invoiceResolvers } from './invoiceResolvers';
import { invoiceDetailsResolvers } from './invoiceDetailsResolvers';
import { mergeResolvers  } from '@graphql-tools/merge';

export const resolvers = mergeResolvers({
    ...productResolvers,
    ...sellerResolvers,
    ...customerResolvers,
    ...invoiceResolvers,
    ...invoiceDetailsResolvers
})