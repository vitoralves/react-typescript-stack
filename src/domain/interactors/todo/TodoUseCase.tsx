import TodoHolder from "../../entity/todo/models/TodoHolder";
import TodoRepository from "../../repository/todo/TodoRepository";
import TodoStructure from "../../structures/TodoStructure";

export default class TodoUseCase {
    private todoRepository: TodoRepository
    private todoHolder: TodoHolder

    constructor(todoRepository: TodoRepository, todoHolder: TodoHolder) {
        this.todoRepository = todoRepository
        this.todoHolder = todoHolder
    }

    public async getAll(): Promise<void> {
        const todos = await this.todoRepository.getAllTodo()
        this.todoHolder.onTodoListChange(todos)
    }

    public async addTodo(todo: TodoStructure): Promise<void> {
        await this.todoRepository.addTodo(todo)
    }

    public async getById(id: number): Promise<void> {
        const todo = await this.todoRepository.getById(id)
        this.todoHolder.onTodoValueUpdate(todo)
    }

    public async updateTodo(todo: TodoStructure): Promise<void> {
        await this.todoRepository.updateTodo(todo)
    }
}