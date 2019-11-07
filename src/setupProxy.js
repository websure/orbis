const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/streams",
    proxy({
      target: "https://api.stocktwits.com/api/2",
      changeOrigin: true,
      autoRewrite: true     
    })
  );
};
