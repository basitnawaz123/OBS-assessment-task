const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const constructResponse = (expressResponseObject, responseData) => {
  if (responseData.success) {
    return expressResponseObject.status(responseData.status).send({
      data: responseData.data,
      message: responseData.message,
      success: true,
    });
  } else {
    if (responseData.data) {
      return expressResponseObject.status(responseData.status).send({
        data: responseData.data,
        message: responseData.message,
        success: false,
      });
    }
    return expressResponseObject.status(responseData.status).send({
      message: responseData.message,
      success: false,
    });
  }
};

const generatePasswordHash = async (password) => {
  try {
    const passwordSalt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, passwordSalt);
  } catch (error) {
    return null;
  }
};

const generateJwtToken = async (object, expire_time) => {
  return jwt.sign(object, JWT_SECRET_KEY, { expiresIn: expire_time });
};

module.exports = {
  constructResponse,
  generatePasswordHash,
  generateJwtToken,
};
