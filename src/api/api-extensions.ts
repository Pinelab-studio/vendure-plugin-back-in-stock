import { gql } from 'graphql-tag';

export const commonApiExtensions = gql`
    type BackInStock implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        status: BackInStockSubscriptionStatus!
        productVariant: ProductVariant!
        channel: Channel!
        customer: Customer
        email: String!
    }

    enum BackInStockSubscriptionStatus {
        Created
        Notified
        Converted
    }

    input CreateBackInStockInput {
        email: String!
        productVariantId: ID!
    }

    input UpdateBackInStockInput {
        id: ID!
        status: BackInStockSubscriptionStatus!
    }

    input ProductVariantInput {
        productVariantId: ID!
    }

    type BackInStockList implements PaginatedList {
        items: [BackInStock!]!
        totalItems: Int!
    }

    union CreateBackInStockSubscriptionResult = BackInStock | BackInStockAlreadySubscribedError

    type BackInStockAlreadySubscribedError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    extend type Query {
        activeBackInStockSubscriptionsForProductVariant(input: ProductVariantInput): BackInStockList!
        activeBackInStockSubscriptionForProductVariantWithCustomer(
            input: CreateBackInStockInput!
        ): BackInStock!
    }

    extend type Mutation {
        createBackInStockSubscription(input: CreateBackInStockInput!): CreateBackInStockSubscriptionResult!
        updateBackInStockSubscription(input: UpdateBackInStockInput!): BackInStock!
    }
`;

export const shopApiExtensions = gql`
    ${commonApiExtensions}
`;

export const adminApiExtensions = gql`
    extend type Query {
        backInStockSubscriptions: BackInStockList!
    }
    ${commonApiExtensions}
`;