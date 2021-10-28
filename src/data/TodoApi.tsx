import TodoRepository from "../domain/repository/todo/TodoRepository";
import TodoStructure from "../domain/structures/TodoStructure";

export default class TodoApi implements TodoRepository {
    todos: Array<TodoStructure> = [
        {
            id: Math.random(),
            title: 'Title 1',
            description: 'Desc 1',
            finished: false
        },
        {
            id: Math.random(),
            title: 'Title 2',
            description: 'Description to set on item 2',
            finished: false
        },
        {
            id: Math.random(),
            title: 'Title 3',
            description: 'Description returned by API to use on item 3',
            finished: true
        }
    ]

    public getAllTodo(): Promise<Array<TodoStructure>> {
        return Promise.resolve(this.todos)
    }

    public addTodo(todo: TodoStructure): Promise<Array<TodoStructure>> {
        this.todos.push(todo)
        return Promise.resolve(this.todos)
    }
}