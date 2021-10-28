import React, { Component } from 'react'
import TodoViewModel from '../../view-model/todo/TodoViewModel';
import { Container, Form, Header, Message } from 'semantic-ui-react'
import BaseView from '../BaseView';

export interface AddTodoProps {
    todoViewModel: TodoViewModel
    match: {
        params: any
    }
}

export interface AddTodoState {
    todo: any,
    messagesList: Array<string>,
    showMessages: boolean,
    messageType: string,
    isEditing: boolean,
}

export default class TodoForm extends Component<AddTodoProps, AddTodoState> implements BaseView {

    private todoViewModel: TodoViewModel

    constructor(props: AddTodoProps) {
        super(props)
        const { todoViewModel } = this.props
        this.todoViewModel = todoViewModel

        this.state = {
            todo: todoViewModel.todo,
            messagesList: todoViewModel.messagesList,
            showMessages: todoViewModel.showMessages,
            messageType: todoViewModel.messageType,
            isEditing: todoViewModel.isEditing
        }
    }

    public componentDidMount(): void {
        if (this.props.match.params.id) {
            this.todoViewModel.editTodo(this.props.match.params.id)
        }
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
            todo,
        } = this.state
        console.log('TodoForm render')
        return (
            <Container>
                <Header as='h2' content={`${todo.id ? `Editando Todo ${todo.id}` : 'Cadastro de Todo'}`} />
                {
                    this.todoViewModel.showMessages &&
                    <Message color={this.todoViewModel.messageType === 'error' ? 'red' : 'green'}>
                        <Message.Header>{this.todoViewModel.messageType === 'error' ? 'Validações' : 'Sucesso'}</Message.Header>
                        {this.todoViewModel.messagesList.map(m => (<p>{m}</p>))}
                    </Message>
                }

                <Form>
                    <Form.Group width='equal'>
                        <Form.Input
                            width={6}
                            label='Título'
                            placeholder='Insira um título'
                            id='title'
                            value={todo.title}
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
                        onClick={
                            todo.id ?
                                this.todoViewModel.onEditTodoSubmit :
                                this.todoViewModel.onAddTodoSubmit}
                        floated='right'
                    >
                        {todo.id ? 'Alterar' : 'Inserir'}
                    </Form.Button>
                </Form>
            </Container>
        )
    }
}