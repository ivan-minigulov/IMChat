export {}
const mongoose = require('mongoose')

const MessagerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    friendname: {
      type: String,
    },
    messages: {
      type: Array,
      default: [],
    },
    // friendMessages: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
)

const MessagerModel = mongoose.model('Messager', MessagerSchema)

module.exports = { MessagerModel }
