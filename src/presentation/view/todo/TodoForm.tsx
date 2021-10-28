import React, { Component } from 'react'
import TodoStructure from '../../../domain/structures/TodoStructure';
import TodoViewModel from '../../view-model/todo/TodoViewModel';
import { Container, Form, Header, Message } from 'semantic-ui-react'
import BaseView from '../BaseView';

export interface AddTodoProps {
    todoViewModel: TodoViewModel
}

export interface AddTodoState {
    todo: TodoStructure,
    errorMessage: Array<string>,
    showErrorMessage: boolean,
}

export default class TodoForm extends Component<AddTodoProps, AddTodoState> implements BaseView {

    private todoViewModel: TodoViewModel

    constructor(props: AddTodoProps) {
        super(props)
        const { todoViewModel } = this.props
        this.todoViewModel = todoViewModel

        this.state = {
            todo: todoViewModel.todo,
            errorMessage: todoViewModel.errorMessage,
            showErrorMessage: todoViewModel.showErrorMessage,
        }
    }

    public componentDidMount(): void {
        this.todoViewModel.attachView(this)
    }

    public componentWillUnmount(): void {
        this.todoViewModel.detachView()
    }

    public onViewModelChanged = () => {
        this.setState({
            todo: this.todoViewModel.todo
        })
    }

    render(): JSX.Element {
        const {
            todo
        } = this.state

        return (
            <Container>
                <Header as='h2' content={`${todo.id ? `Editando Todo ${todo.id}` : 'Cadastro de Todo'}`} />
                {
                    this.todoViewModel.showErrorMessage &&
                    <Message error>
                        <Message.Header>Validações</Message.Header>
                        {this.todoViewModel.errorMessage.map(m => (<p>{m}</p>))}
                    </Message>
                }

                <Form>
                    <Form.Group width='equal'>
                        <Form.Input
                            width={6}
                            label='Título'
                            placeholder='Insira um título'
                            id='title'
                            content={todo.title}
                            onChange={this.todoViewModel.onInputFieldChange}
                        />
                        <Form.Checkbox
                            label='Finalizado'
                            checked={todo.finished}
                            name='finished'
                            id='finished'
                            onClick={this.todoViewModel.onCheckboxChange}
                        />
                    </Form.Group>
                    <Form.TextArea
                        label='Descrição'
                        placeholder='Insira uma descrição nesse campo...'
                        id='description'
                        value={todo.description}
                        onChange={this.todoViewModel.onInputFieldChange}
                    />
                    <Form.Button
                        type='button'
                        onClick={this.todoViewModel.onAddTodoSubmit}
                        floated='right'
                    >
                        {todo.id ? 'Alterar' : 'Inserir'}
                    </Form.Button>
                </Form>
            </Container>
        )
    }
}