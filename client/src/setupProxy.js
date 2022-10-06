const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      //14.6.86.98:8080/지훈님
      //59.16.126.210:8080/ 대한님
      target: "http://3.35.188.110:8080/",
      changeOrigin: true,
    })
  );
};

// const fs = require('fs');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// createProxyMiddleware({
//   target: {
//     protocol: 'https:',
//     host: 'woodongs.site',
//     port: 443,
//     pfx: fs.readFileSync('path/to/certificate.p12'),
//     passphrase: 'password',
//   },
//   changeOrigin: true,
// });
