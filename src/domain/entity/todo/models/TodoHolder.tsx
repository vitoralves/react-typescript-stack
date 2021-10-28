import TodoStructure from "../../../structures/TodoStructure"
import { TodoListener } from "./TodoListener"

export default class TodoHolder {
    private todoListeners: TodoListener[]
    public todoList: Array<TodoStructure>
    public todo: TodoStructure

    constructor() {
        this.todoListeners = []
        this.todoList = []
        this.todo = {
            title: '',
            description: '',
            finished: false
        }
    }

    onTodoListChange(todos: Array<TodoStructure>): void {
        this.todoList = todos
        this.notifyListeners()
    }

    onTodoValueUpdate(todo: TodoStructure): void {
        this.todo = todo
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