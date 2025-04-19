const { sendSuccess, sendFailed } = require('../middlewares/sendMsg')
const { parseJsonBody } = require('../middlewares/parseJsonBody')
const TodoList = require('../models/todo.model')


const todoListInstance = new TodoList();
// 取得全部代辦項目
const getAll = (req, res) => {
    const allTodos = todoListInstance.getAll()
    const msg = {
        message: '取得代辦項目成功',
        data: allTodos,
    }
    return sendSuccess({res, msg})
}
// 清空所有代辦清單
const removeAll = (req, res) =>{
    const todoList = todoListInstance.removeAll()
    const msg = {
        message: '代辦事項已全部清空',
        data: todoList,
    }
    return sendSuccess({res, msg})
}
// 創建單筆代辦項目
const createTodo = async (req, res) => {
    // 確認傳送格式可以正常解析 JSON
    let data = {};
    try {
        data = await parseJsonBody(req)
    } catch (error) {
        return sendFailed({ res, msg: "無效的 JSON 格式", statusCode: 400 })
    }
    // 確認指定欄位 key 值存在
    const isTitleExist = data && data.title
    if (!isTitleExist) return sendFailed({ res, msg: "請求缺失必要 title 欄位，請確認傳送的資料完整性", statusCode: 400 })

    // 新增代辦項目
    const { title } = data
    todoListInstance.create(title)
    // 發送回傳的響應
    const msg = {
        message: '新增代辦項目成功',
        data: todoListInstance.getAll(),
    }
    return sendSuccess({res, msg, statusCode: 201})
}
// 刪除單筆代辦項目
const removeTodo = async (req, res) => {
    // 解析路由參數
    const id = req.params.id
    if (!id) return sendFailed({res, msg: "路由缺失必要 id 參數，請確認傳送的資料完整性", statusCode: 400 })

    // 確認刪除的編號在目前代辦清單項目裡面找得到
    const removeItem = todoListInstance.remove(id)
    if (!removeItem) return sendFailed({ res, msg: '找不到對應的 Id 資料', statusCode: 400 })

    // 發送回傳的響應
    const msg = {
        message: '刪除項目成功',
        data: removeItem,
    }
    return sendSuccess({res, msg})
}
// 修改單筆代辦項目
const updateTodo = async (req, res) => {
    // 解析路由參數
    const id = req.params.id
    if (!id) return sendFailed({ res, msg: "路由缺失必要 id 參數，請確認傳送的資料完整性", statusCode: 400 })

    // 確認傳送格式可以正常解析 JSON
    let data;
    try {
        data = await parseJsonBody(req)
    } catch (error) {
        return sendFailed({res, msg: "無效的 JSON 格式", statusCode: 400 })
    }
    
    // 確認指定欄位 key 值存在
    const isTitleExist = data && data.title
    if (!isTitleExist) return sendFailed({ req, res, msg: "請求缺失必要 title 欄位，請確認傳送的資料完整性", statusCode: 400 })

    // 確保修改項目存在
    const { title } = data
    const updateItem = todoListInstance.update(id, title)
    if (!updateItem) return sendFailed({ res, msg: "找不到對應的 Id 資料", statusCode: 400 })

    // 發送回傳的響應
    const msg = {
        message: '更新項目成功',
        data: updateItem,
    }
    return sendSuccess({res, msg})
}

module.exports = { getAll, removeAll,  createTodo, removeTodo, updateTodo }