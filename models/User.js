const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);


const User = model('User', userSchema);

module.exports = User;