module.exports = {
  version: "0.0.1",
  init: function (pluginContext) {
    let policy = require("./policies/verifySelfAuth-token");
    pluginContext.registerPolicy(policy);
  },
  policies: ["verifySelfAuth-token"],
  schema: {
    $id: "https://express-gateway.io/schemas/plugins/verifySelfAuth-token.json",
  },
};
