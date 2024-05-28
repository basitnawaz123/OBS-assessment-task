const { constructResponse } = require("../utils/utility");

const UserService = new (require("../services/userService"))();

module.exports = (app) => {
  app.post("/api/user", async (req, res) => {
    const responseData = await UserService.createUser(req.body);
    return constructResponse(res, responseData);
  });

  app.get("/api/users", async (req, res) => {
    const responseData = await UserService.getAllUsers();
    return constructResponse(res, responseData);
  });
};
