import TodoHolder from "../../entity/todo/models/TodoHolder";
import TodoRepository from "../../repository/todo/TodoRepository";

export default class TodoUseCase {
    private todoRepository: TodoRepository
    private todoHolder: TodoHolder

    constructor(todoRepository: TodoRepository, todoHolder: TodoHolder) {
        this.todoRepository = todoRepository
        this.todoHolder = todoHolder
    }

    public async getAll(): Promise<void> {
        const todos = await this.todoRepository.getAllTodo()
        this.todoHolder.onGetAll(todos)
    }
}