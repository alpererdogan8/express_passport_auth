const User = require("../models/user");
const BaseService = require("./BaseService");
const bcrypt = require("bcrypt");
class UserService extends BaseService {
  async findUser(name) {
    return this.findBy("username", name);
  }
  async registerUser(username, password) {
    const isUser = await this.findBy("username", username);

    if (isUser) return "User Already Exists";

    if (!isUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new this.model({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      return "User Created";
    }
  }
}

module.exports = new UserService(User);
