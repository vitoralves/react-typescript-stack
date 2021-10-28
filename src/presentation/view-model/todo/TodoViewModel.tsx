import React from "react";
import TodoStructure from "../../../domain/structures/TodoStructure";
import BaseViewModel from "../BaseViewModel";

export default interface TodoViewModel extends BaseViewModel {
    todo: any
    todoList: Array<any>
    messagesList: Array<string>
    showMessages: boolean
    messageType: string
    isEditing: boolean

    onSearchClick(): void
    onAddTodoSubmit(): void
    onEditTodoSubmit(): void
    editTodo(id: number): void
    onInputFieldChange(event: React.FormEvent<any>): void
    onCheckboxChange(envet: React.MouseEvent<HTMLInputElement, MouseEvent>): void
}