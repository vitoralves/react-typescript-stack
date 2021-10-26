import TodoResult from "../../../structures/TodoResult"
import { TodoListener } from "./TodoListener"

export default class TodoHolder {
    private todoListeners: TodoListener[]
    public todoList: Array<TodoResult>

    constructor() {
        this.todoListeners = []
        this.todoList = []
    }

    onGetAll(todos: Array<TodoResult>): void {
        console.log(todos)
        this.todoList = todos
        this.notifyListeners()
    }

    addTodoListener(todoListener: TodoListener): void {
        this.todoListeners.push(todoListener)
    }

    removeTodoListener(todoListener: TodoListener): void {
        this.todoListeners.splice(this.todoListeners.indexOf(todoListener), 1)
    }

    notifyListeners(): void {
        this.todoListeners.forEach((listener) => listener.onTodoChange())
    }
}