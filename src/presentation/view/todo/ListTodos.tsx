import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Table, Button, Icon } from 'semantic-ui-react'
import TodoViewModel from '../../view-model/todo/TodoViewModel'
import BaseView from '../BaseView'

export interface ListTodosProps {
    todoViewModel: TodoViewModel
}

export interface ListTodosState {
    todoList: Array<any>
    messagesList: Array<string>,
    showMessages: boolean,
    messageType: string,
}

export default class ListTodos extends Component<ListTodosProps, ListTodosState> implements BaseView {

    private todoViewModel: TodoViewModel

    public constructor(props: ListTodosProps) {
        super(props)

        const { todoViewModel } = this.props
        this.todoViewModel = todoViewModel

        this.state = {
            todoList: todoViewModel.todoList,
            messagesList: todoViewModel.messagesList,
            showMessages: todoViewModel.showMessages,
            messageType: todoViewModel.messageType
        }
    }

    public componentDidMount(): void {
        this.todoViewModel.attachView(this)
    }

    public componentWillUnmount(): void {
        this.todoViewModel.detachView()
    }

    public onViewModelChanged(): void {
        console.log('view change ListTodos')
        this.setState({
            todoList: this.todoViewModel.todoList
        })
    }

    private onEditButtonClick = (): any => {
        <Link to='/edit/6' />
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
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Título</Table.HeaderCell>
                            <Table.HeaderCell>Descrição</Table.HeaderCell>
                            <Table.HeaderCell>Finalizado</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {todoList.map(todo => {
                            return <Table.Row key={todo.id}>
                                <Table.Cell>{todo.id}</Table.Cell>
                                <Table.Cell>{todo.title}</Table.Cell>
                                <Table.Cell>{todo.description}</Table.Cell>
                                <Table.Cell>
                                    <Icon name={todo.finished ? 'check circle' : 'delete'} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={`/edit/${todo.id}`}>Editar</Link>
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Container >
        )
    }
}