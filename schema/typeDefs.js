const { gql } = require('apollo-server');

const typeDefs = gql`
    type Message {
        _id: ID
        text: String
        createdBy: String
    }

    type User {
        _id: ID
        username: String
    }

    input MessageInput {
        text: String
        createdBy: String
    }

    type Query {
        message(id: ID!): Message
        users: [User]
    }

    type Mutation {
        createMessage(messageInput: MessageInput): Message!
        addUser(username: String!): User
        deleteUser(username: String!): User
    }

    type Subscription {
        messageCreated: Message
    }
`;

module.exports = typeDefs;