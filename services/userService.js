const User = require("../models/user");
const BaseService = require("./BaseService");

class UserService extends BaseService {
  async findUser(name) {
    return this.findBy("username", name);
  }
}

module.exports = new UserService(User);
