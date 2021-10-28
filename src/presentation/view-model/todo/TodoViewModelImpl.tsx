
import TodoHolder from "../../../domain/entity/todo/models/TodoHolder";
import { TodoListener } from "../../../domain/entity/todo/models/TodoListener";
import TodoUseCase from "../../../domain/interactors/todo/TodoUseCase";
import BaseView from "../../view/BaseView";
import TodoViewModel from "./TodoViewModel";

export default class TodoViewModelImpl implements TodoViewModel, TodoListener {

    public errorMessage: Array<string>
    public showErrorMessage: boolean

    public todo: any
    public todoList: Array<any>
    private baseView?: BaseView

    private todoUseCase: TodoUseCase
    private todoHolder: TodoHolder

    public constructor(todoUseCase: TodoUseCase, todoHolder: TodoHolder) {
        this.todoList = []
        this.errorMessage = []
        this.showErrorMessage = false
        this.todoUseCase = todoUseCase
        this.todoHolder = todoHolder
        this.todo = { finished: false }

        this.todoHolder.addTodoListener(this)
    }

    public onTodoChange(): void {
        this.todoList = this.todoHolder.todoList
    }

    onSearchClick = async () => {
        try {
            await this.todoUseCase.getAll()
            this.showErrorMessage = false
            this.errorMessage = []
        } catch (error: any) {
            this.showErrorMessage = true
            this.errorMessage = error.message
        } finally {
            this.notifiViewAboutChanges()
        }
    }

    onAddTodoSubmit = async () => {
        if (!this.validateTodoBeforeSubmit()) {
            try {
                await this.todoUseCase.addTodo(this.todo)
                this.showErrorMessage = false
                this.errorMessage = []
            } catch (error: any) {
                this.showErrorMessage = true
                this.errorMessage = error.message
            }
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
        this.showErrorMessage = false
        this.errorMessage = []
        if (!this.todo.title || this.todo.title.length < 3) {
            this.errorMessage.push('Título deve ter no mímino 3 caracteres')
            this.showErrorMessage = true
        }
        if (!this.todo.description || this.todo.description.length < 10) {
            this.errorMessage.push('Descrição deve ter no mímino 10 caracteres')
            this.showErrorMessage = true
        }

        return this.showErrorMessage
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