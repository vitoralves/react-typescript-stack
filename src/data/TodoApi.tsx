import TodoRepository from "../domain/repository/todo/TodoRepository";
import TodoStructure from "../domain/structures/TodoStructure";

export default class TodoApi implements TodoRepository {
    todos: Array<TodoStructure> = [
        {
            id: Math.ceil(Math.random() * 100),
            title: 'Title 1',
            description: 'Desc 1',
            finished: false
        },
        {
            id: Math.ceil(Math.random() * 100),
            title: 'Title 2',
            description: 'Description to set on item 2',
            finished: false
        },
        {
            id: Math.ceil(Math.random() * 100),
            title: 'Title 3',
            description: 'Description returned by API to use on item 3',
            finished: true
        }
    ]

    public getAllTodo(): Promise<Array<TodoStructure>> {
        console.log('getAll')
        return Promise.resolve(this.todos)
    }

    public addTodo(todo: TodoStructure): Promise<Array<TodoStructure>> {
        console.log('add')
        todo.id = Math.ceil(Math.random() * 10)
        this.todos.push(todo)
        return Promise.resolve(this.todos)
    }

    public getById(id: number): Promise<TodoStructure> {
        console.log('getById')
        const todo = this.todos.find(t => t.id == id)
        console.log(todo)
        if (todo) {
            return Promise.resolve(todo)
        } else {
            return Promise.reject('Todo não encontrado')
        }
    }

    public updateTodo(todo: TodoStructure): Promise<TodoStructure> {
        console.log('update Todo')
        this.todos.map(t => {
            if (t.id === todo.id) {
                return todo
            }
            return t
        })

        return Promise.resolve(todo)
    }
}