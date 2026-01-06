module.exports = {
  version: "0.0.1",
  init: function (pluginContext) {
    let policy = require("./policies/verify-token");
    pluginContext.registerPolicy(policy);
  },
  policies: ["verify-token"],
  schema: {
    $id: "https://express-gateway.io/schemas/plugins/verify-token.json",
  },
};
