import TodoResult from "../../structures/TodoResult";

export default interface TodoRepository {
    getAllTodo(): Promise<Array<TodoResult>>
}