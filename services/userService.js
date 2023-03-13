const User = require('../models/user');
const BaseService = require('./BaseService');
class UserService extends BaseService {
	async findUser(name) {
		return this.findBy('username', name);
	}
	async registerUser(username, password) {
		const isUser = await this.findBy('username', username);

		if (isUser) return 'User Already Exists';

		if (!isUser) {
			await this.model.register(new this.model({ username: username }), password);
			return 'User Created';
		}
	}
}

module.exports = new UserService(User);
