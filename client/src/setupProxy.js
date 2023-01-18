const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://api.woodongs.site/",
      changeOrigin: true,
    })
  );
};


