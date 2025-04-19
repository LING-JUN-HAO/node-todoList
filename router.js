const urlLib = require('url');
const { getAll, removeAll, createTodo, removeTodo, updateTodo } = require('./controllers/todo.controller')

// 路由配對表
const routes = [
    { method: 'GET', path: '/todoList', handler: getAll },
    { method: 'POST', path: '/todoList', handler: createTodo },
    { method: 'DELETE', path: '/todoList', handler: removeAll },
    { method: 'DELETE', path: /^\/todoList\/([^/]+)$/, handler: removeTodo },
    { method: 'PATCH', path: /^\/todoList\/([^/]+)$/, handler: updateTodo },
];

function findRoute(method, fullUrl) {
  const { pathname } = urlLib.parse(fullUrl);
  for (const { method: m, path, handler } of routes) {
    if (m !== method) continue;
    if (typeof path === 'string' && path === pathname)  return { handler, params: {} };
    if (path instanceof RegExp) {
      const m2 = pathname.match(path);
      if (m2) return { handler, params: { id: m2[1] } };
    }
  }
  return null;
}

module.exports = { findRoute };