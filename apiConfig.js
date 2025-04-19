const header = {
    // preflight(跨域預檢會使用) https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    "Content-Type": "application/json"
};

module.exports = { header };