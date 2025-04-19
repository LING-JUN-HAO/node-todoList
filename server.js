const http = require("http");
const { findRoute } = require('./router')
const { sendFailed } = require('./middlewares/sendMsg')
const { header } = require('./apiConfig')

const handler = async (req, res) => {
    // 處理全域回傳 header
    for (const [k, v] of Object.entries(header)) {
        res.setHeader(k, v);
    }
    const method = req.method;

    // UptimeRobot 測試服務使用
    if (req.method === 'HEAD') {
        res.statusCode = 200;
        return res.end();
      }
    // 處理 preflight
    if (method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
    }
    // 路由配對
    const route = findRoute(method, req.url)
    if (!route) return sendFailed({ res, msg: "Not Found", statusCode: 404 })

    req.params = route.params;
    try {
        await route.handler(req, res)
    } catch (error) {
        sendFailed({ res, msg: "Internal Server Error", statusCode: 500 })
    }
};
const server = http.createServer(handler);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`伺服器已成功運行在 Port：${port}`);
});
