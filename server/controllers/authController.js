const Auth = require("../services/authService");
const { constructResponse } = require("../utils/utility");
const AuthService = new Auth();

module.exports = (app) => {
  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const responseData = await AuthService.login(email.toLowerCase(), password);
    constructResponse(res, responseData);
  });
};
