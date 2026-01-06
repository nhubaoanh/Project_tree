const middleware = require("../../../middleware");
module.exports = {
  name: "verify-token",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/verify-token.json",
    type: "object",
  },
  policy: (actionParams) => {
    return (req, res, next) => {
      middleware.verifyToken(req, res, next);
    };
  },
};
