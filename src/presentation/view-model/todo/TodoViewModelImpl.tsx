
import TodoHolder from "../../../domain/entity/todo/models/TodoHolder";
import { TodoListener } from "../../../domain/entity/todo/models/TodoListener";
import TodoUseCase from "../../../domain/interactors/todo/TodoUseCase";
import BaseView from "../../view/BaseView";
import TodoViewModel from "./TodoViewModel";

export default class TodoViewModelImpl implements TodoViewModel, TodoListener {

    public errorMessage: string
    public showErrorMessage: boolean

    public todoList: Array<any>
    private baseView?: BaseView

    private todoUseCase: TodoUseCase
    private todoHolder: TodoHolder

    public constructor(todoUseCase: TodoUseCase, todoHolder: TodoHolder) {
        this.todoList = []
        this.errorMessage = ''
        this.showErrorMessage = false
        this.todoUseCase = todoUseCase
        this.todoHolder = todoHolder

        this.todoHolder.addTodoListener(this)
    }

    public onTodoChange(): void {
        console.log('listener')
        this.todoList = this.todoHolder.todoList
    }

    onSearchClick = async () => {
        try {
            await this.todoUseCase.getAll()
            this.showErrorMessage = false
            this.errorMessage = ''
        } catch (error: any) {
            this.showErrorMessage = true
            this.errorMessage = error.message
        } finally {
            this.notifiViewAboutChanges()
        }
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