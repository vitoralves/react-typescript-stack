import { Component } from 'react'
import { Container } from 'semantic-ui-react'
import TodoViewModelImpl from './presentation/view-model/todo/TodoViewModelImpl'
import Todo from './presentation/view/todo/Todo'

import 'semantic-ui-css/semantic.min.css'
import TodoUseCase from './domain/interactors/todo/TodoUseCase'
import TodoHolder from './domain/entity/todo/models/TodoHolder'
import TodoApi from './data/TodoApi'

export default class App extends Component {

  todoViewModel: TodoViewModelImpl
  todoUseCase: TodoUseCase
  todoHolder: TodoHolder
  todoRepository: TodoApi

  constructor(props: any) {
    super(props)
    this.todoRepository = new TodoApi()
    this.todoHolder = new TodoHolder()
    this.todoUseCase = new TodoUseCase(this.todoRepository, this.todoHolder)
    this.todoViewModel = new TodoViewModelImpl(this.todoUseCase, this.todoHolder)
  }

  render() {
    return (
      <Container fluid>
        <Todo todoViewModel={this.todoViewModel} />
      </Container>
    )
  }
}
