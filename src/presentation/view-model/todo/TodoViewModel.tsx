import BaseViewModel from "../BaseViewModel";

export default interface TodoViewModel extends BaseViewModel {
    todoList: Array<any>
    errorMessage: string
    showErrorMessage: boolean

    onSearchClick(): void
}