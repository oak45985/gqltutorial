const Message = require('../models/Message');
const { PubSub } = require('graphql-subscriptions');
const User = require('../models/User');

const pubsub = new PubSub();

const resolvers = {
    Mutation: {
        addUser: async (parent, { username }) => {
            const user = await User.create({ username });
            return user;
            },
        deleteUser: async (parent, { username }) => {
            const user = await User.findOneAndDelete({ username });
        },
        createMessage: async (_, {messageInput: {text, createdBy}}) => {
            const newMessage = new Message({
                text: text,
                createdBy: createdBy
            });
            const res = await newMessage.save();

            pubsub.publish('MESSAGE_CREATED', {
                messageCreated: {
                    text: text,
                    createdBy: createdBy
                }
            });

            return {
                id: res.id,
                ...res._doc
            };
            
        },
    },

    Subscription: {
        messageCreated: {
            subscribe: () => pubsub.asyncIterator('MESSAGE_CREATED') 
        }
    },
    Query: {
        message: (_, {ID}) => Message.findById(ID),
        users: async () => {
            return User.find();
        },
    },

}

module.exports = resolvers;