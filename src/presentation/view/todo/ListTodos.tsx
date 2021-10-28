import { Component } from 'react'
import { Container, Header, Table, Button, Icon } from 'semantic-ui-react'
import TodoViewModel from '../../view-model/todo/TodoViewModel'
import BaseView from '../BaseView'

export interface ListTodosProps {
    todoViewModel: TodoViewModel
}

export interface ListTodosState {
    todoList: Array<any>
    errorMessage: Array<String>
    showErrorMessage: boolean
}

export default class ListTodos extends Component<ListTodosProps, ListTodosState> implements BaseView {

    private todoViewModel: TodoViewModel

    public constructor(props: ListTodosProps) {
        super(props)

        const { todoViewModel } = this.props
        this.todoViewModel = todoViewModel

        this.state = {
            todoList: todoViewModel.todoList,
            errorMessage: todoViewModel.errorMessage,
            showErrorMessage: todoViewModel.showErrorMessage
        }
    }

    public componentDidMount(): void {
        this.todoViewModel.attachView(this)
    }

    public componentWillUnmount(): void {
        this.todoViewModel.detachView()
    }

    public onViewModelChanged(): void {
        this.setState({
            todoList: this.todoViewModel.todoList
        })
    }

    render(): JSX.Element {
        const {
            todoList
        } = this.state

        return (
            <Container>
                <Header as="h2">Todo List</Header>
                <Button onClick={this.todoViewModel.onSearchClick} >Buscar </Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Finished</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {todoList.map(todo => {
                            return <Table.Row key={todo.title}>
                                <Table.Cell>{todo.title}</Table.Cell>
                                <Table.Cell>{todo.description}</Table.Cell>
                                <Table.Cell>
                                    <Icon name={todo.finished ? 'check circle' : 'delete'} />
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Container>
        )
    }
}