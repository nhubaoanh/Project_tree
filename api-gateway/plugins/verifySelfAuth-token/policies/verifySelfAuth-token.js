const middleware = require("../../../middleware");
module.exports = {
  name: "verifySelfAuth-token",
  schema: {
    $id: "http://express-gateway.io/schemas/policies/verifySelfAuth-token.json",
    type: "object",
  },
  policy: (actionParams) => {
    return (req, res, next) => {
      middleware.verifyTokenAndSelfAuth(req, res, next);
    };
  },
};
