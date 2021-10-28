
import TodoHolder from "../../../domain/entity/todo/models/TodoHolder";
import { TodoListener } from "../../../domain/entity/todo/models/TodoListener";
import TodoUseCase from "../../../domain/interactors/todo/TodoUseCase";
import BaseView from "../../view/BaseView";
import TodoViewModel from "./TodoViewModel";

export default class TodoViewModelImpl implements TodoViewModel, TodoListener {

    private baseView?: BaseView
    private todoUseCase: TodoUseCase
    private todoHolder: TodoHolder

    public messagesList: Array<string>
    public showMessages: boolean
    public messageType: string
    public isEditing: boolean

    public todo: any
    public todoList: Array<any>


    public constructor(todoUseCase: TodoUseCase, todoHolder: TodoHolder) {
        this.todoList = []
        this.messagesList = []
        this.showMessages = false
        this.messageType = ''
        this.todoUseCase = todoUseCase
        this.todoHolder = todoHolder
        this.isEditing = false
        this.todo = {
            title: '',
            description: '',
            finished: false
        }

        this.todoHolder.addTodoListener(this)
    }

    public onTodoChange(): void {
        this.todoList = this.todoHolder.todoList
        this.todo = this.todoHolder.todo
    }

    onSearchClick = async () => {
        try {
            await this.todoUseCase.getAll()
            this.showMessages = false
            this.messagesList = []
        } catch (error: any) {
            this.showMessages = true
            this.messageType = 'error'
            this.messagesList = error.message
        } finally {
            this.notifiViewAboutChanges()
        }
    }

    onAddTodoSubmit = async () => {
        if (!this.validateTodoBeforeSubmit()) {
            try {
                await this.todoUseCase.addTodo(this.todo)
                this.todo = {}
                window.history.back()
            } catch (error: any) {
                this.messageType = 'error'
                this.showMessages = true
                this.messagesList = error.message
            }
        } else {
            this.messageType = 'error'
            this.notifiViewAboutChanges()
        }
    }

    onEditTodoSubmit = async () => {
        if (!this.validateTodoBeforeSubmit()) {
            try {
                await this.todoUseCase.updateTodo(this.todo)
                this.todo = {}
                window.history.back()
            } catch (error: any) {
                console.log(error)
                this.messageType = 'error'
                this.showMessages = true
                this.messagesList = error.message
            }
        } else {
            this.messageType = 'error'
            this.notifiViewAboutChanges()
        }
    }

    editTodo = async (id: number) => {
        try {
            this.isEditing = true
            await this.todoUseCase.getById(id)
        } catch (error: any) {
            console.log(error)
            this.messageType = 'error'
            this.showMessages = true
            this.messagesList.push(error.message)
        } finally {
            this.notifiViewAboutChanges()
        }
    }

    onInputFieldChange = (event: React.FormEvent<any>) => {
        this.todo[event.currentTarget['id']] = event.currentTarget.value
        this.notifiViewAboutChanges()
    }

    onCheckboxChange = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        this.todo.finished = this.todo.finished ? false : true
        this.notifiViewAboutChanges()
    }

    validateTodoBeforeSubmit = () => {
        this.showMessages = false
        this.messagesList = []
        if (!this.todo.title || this.todo.title.length < 3) {
            this.messagesList.push('Título deve ter no mímino 3 caracteres')
            this.showMessages = true
        }
        if (!this.todo.description || this.todo.description.length < 10) {
            this.messagesList.push('Descrição deve ter no mímino 10 caracteres')
            this.showMessages = true
        }

        return this.showMessages
    }

    public attachView = (baseView: BaseView): void => {
        this.baseView = baseView
    }

    public detachView = (): void => {
        this.baseView = undefined
    }

    public notifiViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged()
        }
    }

}