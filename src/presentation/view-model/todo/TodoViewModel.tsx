import React from "react";
import TodoStructure from "../../../domain/structures/TodoStructure";
import BaseViewModel from "../BaseViewModel";

export default interface TodoViewModel extends BaseViewModel {
    todo: any
    todoList: Array<any>
    errorMessage: Array<string>
    showErrorMessage: boolean

    onSearchClick(): void
    onAddTodoSubmit(): void
    onInputFieldChange(event: React.FormEvent<any>): void
    onCheckboxChange(envet: React.MouseEvent<HTMLInputElement, MouseEvent>): void
}