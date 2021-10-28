import { Component } from 'react'
import TodoViewModelImpl from './presentation/view-model/todo/TodoViewModelImpl'
import ListTodos from './presentation/view/todo/ListTodos'

import 'semantic-ui-css/semantic.min.css'
import TodoUseCase from './domain/interactors/todo/TodoUseCase'
import TodoHolder from './domain/entity/todo/models/TodoHolder'
import TodoApi from './data/TodoApi'
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import TodoForm from './presentation/view/todo/TodoForm'

interface AppProps {

}

interface AppState {
  activeItem: string
}

export default class App extends Component<AppProps, AppState> {

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

    this.state = {
      activeItem: '/'
    }
  }

  render(): JSX.Element {
    const {
      activeItem
    } = this.state

    return (
      <Router>
        <div>
          <Menu>
            <Menu.Item
              name='/'
              active={activeItem === '/'}
              link
              content={<Link to='/'>Home</Link>}
            />

            <Menu.Item
              name='new'
              active={activeItem === 'new'}
              link
              content={<Link to='/new'>Cadastro</Link>}
            />
          </Menu>

          <Switch>
            <Route exact path="/" render={props => <ListTodos {...props} todoViewModel={this.todoViewModel} />} />
            <Route exact path="/new" render={props => <TodoForm {...props} todoViewModel={this.todoViewModel} />} />
            <Route exact path="/edit/:id" render={props => <TodoForm {...props} todoViewModel={this.todoViewModel} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}
