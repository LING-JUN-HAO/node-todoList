const { v4: uuidv4 } = require('uuid');

class TodoList {
    #todoList = new Map();

    getAll () {
        return Array.from(this.#todoList.values())
    }

    create (title) {
        const id = uuidv4()
        const todoListItem = {
            id,
            title: title
        }
        this.#todoList.set(id, todoListItem)
        return todoListItem
    }

    remove (id) {
        const deleteItem = this.#todoList.get(id)
        if(!deleteItem) return null
        this.#todoList.delete(id)
        return deleteItem
    }

    removeAll(){
        this.#todoList.clear()
        return []
    }

    update (id, title) {
        const updateItem = this.#todoList.get(id)
        if(!updateItem) return null
        const newTodoItem = {
            id: updateItem.id,
            title
        }
        this.#todoList.set(id, newTodoItem)
        return newTodoItem
    }
}

module.exports = TodoList