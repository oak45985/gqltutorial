const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
    {
        text: {
            type: String
        },
        createdBy: {
                type: String
            },
        sentTo: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ]
    }
)

const Message = model('Message', messageSchema);

module.exports = Message;