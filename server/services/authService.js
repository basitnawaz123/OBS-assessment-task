const UsersModel = require("../models/Users");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../utils/utility");
module.exports = class UserService {
  async login(email, password) {
    try {
      const user = await UsersModel.findOne({ email: email });
      if (user == null) {
        return {
          status: 401,
          message: "Invalid email or Password",
          success: false,
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userObj = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        const token = await generateJwtToken(userObj, "7d");
        return {
          status: 201,
          success: true,
          data: {
            token: token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          message: "User Logged In Successfully!",
        };
      } else {
        return {
          status: 401,
          message: "Invalid email or Password",
          success: false,
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: error.message,
        success: false,
      };
    }
  }
};
