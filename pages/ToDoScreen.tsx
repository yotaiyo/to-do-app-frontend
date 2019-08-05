import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { TodoInput } from '../components/TodoInput';
import { Todos } from '../components/Todos';
import { Footer } from '../components/Footer';
import { withRouter, SingletonRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { withSectionAndHeader } from '../components/withSectionAndHeader';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

const Wrapper = styled.div``;

const PleaseLoginText = styled.div`
  text-align: center;
  margin-top: 150px;
  font-size: 30px;
`;

const ToastText = styled.div`
  font-family: 'Vollkorn', serif;
  color: black;
`;

interface ToDoScreenProps {
  router: SingletonRouter;
}

export interface TodoType {
  id?: number;
  title: string;
  completed: boolean;
  deadline: Date | null;
  userId: number | null;
}

interface ToDoScreenState {
  todoInput: string;
  todoList: TodoType[];
  showOnlyCompleted: boolean;
  showOnlyActive: boolean;
  isDeadline: boolean;
  showPleaseInputTodo: boolean;
  showCharacterLimit: boolean;
  isLogin: boolean;
  userId: number | null;
  showOnlySorted: boolean;
  isLoading: boolean;
}

class ToDoScreen extends React.Component<ToDoScreenProps, ToDoScreenState> {
  constructor(props: ToDoScreenProps) {
    super(props);
    this.state = {
      todoInput: '',
      todoList: [],
      showOnlyCompleted: false,
      showOnlyActive: false,
      isDeadline: false,
      showCharacterLimit: false,
      showPleaseInputTodo: false,
      isLogin: false,
      userId: null,
      showOnlySorted: false,
      isLoading: true
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    this.getLoginUser(token);
  }

  getLoginUser(token: string | null) {
    axios
      .get(`${API_URL}login`, { params: { token } })
      .then(result => {
        if (result.data) {
          this.setState({ isLogin: true });
          this.setState({ userId: result.data.id });
          this.getTodoList();
          if (this.props.router.query) {
            if (this.props.router.query.from === 'LoginScreen') {
              toast(<ToastText>ログインしました！</ToastText>);
            }
          }
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  getTodoList() {
    if (this.state.userId !== null) {
      axios
        .get(`${API_URL}todos`, {
          params: { user_id: this.state.userId },
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        })
        .then(results => {
          this.setState({ todoList: results.data });
        })
        .catch(data => {
          console.log(data);
        });
    }
  }

  postTodo(todo: TodoType) {
    const { title, completed, deadline, userId } = todo;
    axios
      .post(
        `${API_URL}todos`,
        {
          title: title,
          completed: completed,
          deadline: deadline,
          user_id: userId
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        }
      )
      .then(() => {
        this.setState({ todoInput: '' });
        this.getTodoList();
      })
      .catch(data => {
        console.log(data);
      });
  }

  deleteTodo(id?: number) {
    axios
      .delete(`${API_URL}todos/${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        this.getTodoList();
      })
      .catch(data => {
        console.log(data);
      });
  }

  render() {
    const {
      todoInput,
      todoList,
      showOnlyActive,
      showOnlyCompleted,
      isDeadline,
      showPleaseInputTodo,
      showCharacterLimit,
      isLogin,
      userId,
      showOnlySorted,
      isLoading
    } = this.state;

    return isLoading ? null : isLogin ? (
      <Wrapper>
        <TodoInput
          todoInput={todoInput}
          onChangeTodoInput={this.onChangeTodoInput}
          postTodoInput={this.postTodoInput}
          isDeadline={isDeadline}
          setDeadline={this.setDeadline}
          deleteDeadline={this.deleteDeadline}
          showPleaseInputTodo={showPleaseInputTodo}
          showCharacterLimit={showCharacterLimit}
          userId={userId}
        />
        <Todos
          todoList={todoList}
          onClickCheckButton={this.onClickCheckButton}
          showOnlyCompleted={showOnlyCompleted}
          showOnlyActive={showOnlyActive}
          showOnlySorted={showOnlySorted}
        />
        <Footer
          onClickAll={this.onClickAll}
          onClickCompleted={this.onClickCompleted}
          onClickActive={this.onClickActive}
          showOnlyCompleted={showOnlyCompleted}
          showOnlyActive={showOnlyActive}
          onClickDeleteButton={this.deleteCompletedTodo}
          onClickSort={this.onClickSort}
          todoList={todoList}
          showOnlySorted={showOnlySorted}
        />
        <ToastContainer />
      </Wrapper>
    ) : (
      <Wrapper>
        <PleaseLoginText>
          タスク管理機能を使用するにはログインする必要があります。
        </PleaseLoginText>
      </Wrapper>
    );
  }

  private onChangeTodoInput = (value: string) => {
    this.setState({ todoInput: value });
  };

  private postTodoInput = (
    todoInput: string,
    date: Date | null,
    isDeadline: boolean,
    userId: number | null
  ) => {
    if (todoInput.length === 0) {
      this.setState({ showPleaseInputTodo: true });
      this.setState({ showCharacterLimit: false });
    } else if (todoInput.length >= 15) {
      this.setState({ showPleaseInputTodo: false });
      this.setState({ showCharacterLimit: true });
    } else {
      const todo = {
        title: todoInput,
        completed: false,
        deadline: isDeadline ? date : null,
        userId: userId
      };
      this.postTodo(todo);
      this.setState({ isDeadline: false });
      this.setState({ showPleaseInputTodo: false });
      this.setState({ showCharacterLimit: false });
    }
  };

  private onClickCheckButton = ({
    id,
    completed,
    deadline
  }: {
    id?: number;
    completed: boolean;
    deadline: Date | null;
  }) => {
    axios
      .patch(
        `${API_URL}todos/${id}`,
        {
          completed: !completed,
          deadline: deadline
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        }
      )
      .then(() => {
        this.getTodoList();
      })
      .catch(data => {
        console.log(data);
      });
  };

  private onClickAll = () => {
    this.setState({
      showOnlyActive: false,
      showOnlyCompleted: false,
      showOnlySorted: false
    });
  };

  private onClickCompleted = () => {
    this.setState({
      showOnlyActive: false,
      showOnlyCompleted: true,
      showOnlySorted: false
    });
  };

  private onClickActive = () => {
    this.setState({
      showOnlyActive: true,
      showOnlyCompleted: false,
      showOnlySorted: false
    });
  };

  private onClickSort = () => {
    this.setState({
      showOnlyActive: false,
      showOnlyCompleted: false,
      showOnlySorted: true
    });
  };

  private deleteCompletedTodo = (todoList: TodoType[]) => {
    todoList.forEach(todo => {
      if (todo.completed) {
        this.deleteTodo(todo.id);
      }
    });
  };

  private setDeadline = () => {
    this.setState({ isDeadline: true });
  };

  private deleteDeadline = () => {
    this.setState({ isDeadline: false });
  };
}

export default withSectionAndHeader(withRouter(ToDoScreen));
