export {}
const { UserModel } = require('../models/User')

class UserService {
  async registration(username: string, password: string) {
    const user = new UserModel({ username, password })
    await user.save()
    return user
  }
}

module.exports = new UserService()
