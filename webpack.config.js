const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "pessoas",

  exposes: {
    "./login": "./src/app/login/login.component.ts",
    "./register": "./src/app/register/register.component.ts",
    // "./routes": "./src/app/pessoas/pessoas-routes.ts"
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
