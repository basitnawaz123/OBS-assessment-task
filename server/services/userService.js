const UsersModel = require("../models/Users");

module.exports = class UserService {
  async createUser(body) {
    try {
      let userExists = await UsersModel.findOne({ email: body.email });
      if (userExists) {
        return {
          message: "Email already taken",
          success: false,
          status: 409,
        };
      } else {
        let result = await UsersModel.create(body);
        return {
          data: result,
          message: "User added Successfully!",
          success: true,
          status: 200,
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Something went wrong",
      };
    }
  }

  async getAllUsers() {
    try {
      let result = await UsersModel.find({});
      return {
        data: result,
        status: 200,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Something went wrong",
      };
    }
  }
};
