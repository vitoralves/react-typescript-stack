import { Component } from 'react'
import { Container, Header, Table, Button } from 'semantic-ui-react'
import TodoViewModel from '../../view-model/todo/TodoViewModel'
import BaseView from '../BaseView'

export interface TodoProps {
    todoViewModel: TodoViewModel
}

export interface TodoState {
    todoList: Array<any>
    errorMessage: string
    showErrorMessage: boolean
}

export default class Todo extends Component<TodoProps, TodoState> implements BaseView {

    private todoViewModel: TodoViewModel

    public constructor(props: TodoProps) {
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
        console.log(this.todoViewModel.todoList)
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
                        <Table.Row>
                            <Table.Cell>Title 1</Table.Cell>
                            <Table.Cell>Description 1</Table.Cell>
                            <Table.Cell>True</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        )
    }
}