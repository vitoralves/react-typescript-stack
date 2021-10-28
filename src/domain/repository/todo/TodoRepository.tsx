import TodoStructure from "../../structures/TodoStructure";

export default interface TodoRepository {
    getAllTodo(): Promise<Array<TodoStructure>>

    addTodo(todo: TodoStructure): Promise<Array<TodoStructure>>
}