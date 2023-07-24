const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 1,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 1,
    },
    profilePicture: {
      type: String,
      default: '',
    },

    followers: {
      type: Array,
      default: [],
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

const UserModel = mongoose.model('User', UserSchema)

module.exports = { UserModel }
