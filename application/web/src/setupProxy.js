const { createProxyMiddleware } = require('http-proxy-middleware');
const { REACT_APP_API_URL } = process.env
console.log("REACT_APP_API_URL", REACT_APP_API_URL)
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: REACT_APP_API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/predictions': '/predictions', // remove base path
        '^/api/status': '/status', // remove base path
      },
    })
  );
  app.use(
    '/project-polish-emotions-classifier/api',
    createProxyMiddleware({
      target: REACT_APP_API_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/project-polish-emotions-classifier/api/predictions': '/predictions', // remove base path
        '^/project-polish-emotions-classifier/api/status': '/status', // remove base path
      },
    })
  );
};