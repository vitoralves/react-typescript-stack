import TodoRepository from "../domain/repository/todo/TodoRepository";
import TodoResult from "../domain/structures/TodoResult";

export default class TodoApi implements TodoRepository {
    public getAllTodo(): Promise<Array<TodoResult>> {
        return Promise.resolve([
            {
                title: 'Title 1',
                description: 'Desc 1',
                finished: false
            },
            {
                title: 'Title 2',
                description: 'Description to set on item 2',
                finished: false
            },
            {
                title: 'Title 3',
                description: 'Description returned by API to use on item 3',
                finished: true
            }
        ])
    }
}