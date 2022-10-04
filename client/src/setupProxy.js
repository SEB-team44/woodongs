const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      //14.6.86.98:8080/지훈님
      //59.16.126.210:8080/ 대한님
      target: "https://www.woodongs.site:8080/ ",
      changeOrigin: true,
    })
  );
};
