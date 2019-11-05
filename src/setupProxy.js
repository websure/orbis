const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  console.log("setup");
  app.use(
    "/api",
    proxy({
      target: "https://api.stocktwits.com/api/2",
      changeOrigin: true,
      autoRewrite: true
      // pathRewrite: {
      //   "^/api": ""
      // }
    })
  );
};
