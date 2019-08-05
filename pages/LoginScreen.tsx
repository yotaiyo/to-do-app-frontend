import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Router from 'next/router';
import { withRouter, SingletonRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { withLoginUser, withLoginUserState } from '../components/withLoginUser';
import { withSectionAndHeader } from '../components/withSectionAndHeader';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

const Wrapper = styled.div``;

const FlashText = styled.div`
  text-align: center;
  margin-top: 10px;
  color: #cc3300;
`;

const Title = styled.div`
  margin-top: 20px;
  padding-left: 100px;
  padding-right: 100px;
  color: #444;
  font-size: 24px;
  display: flex;
  align-items: center;
  &:before,
  &:after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: #cccccc;
    display: block;
  }
  &:before {
    margin-right: 0.4em;
  }
  &:after {
    margin-left: 0.4em;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input`
  width: 200px;
  font-size: 15px;
  margin: 0px auto;
  margin-top: 20px;
  outline: 0;
  font-family: 'Vollkorn', serif;
`;

const LoginButton = styled.div`
  margin-top: 10px;
  background-color: #003399;
  color: white;
  padding: 3px;
  margin: 0px auto;
  margin-top: 20px;
  text-align: center;
  width: 80px;
`;

const NavigateSignUpText = styled.div`
  margin: 0px auto;
  margin-top: 20px;
`;

const Here = styled.a`
  color: #003399;
`;

const AlreadyLoginText = styled.div`
  text-align: center;
  margin-top: 150px;
  font-size: 30px;
`;

const ToastText = styled.div`
  font-family: 'Vollkorn', serif;
  color: black;
`;

interface LoginProps extends withLoginUserState {
  router: SingletonRouter;
}

interface LoginState {
  emailInput: string;
  passwordInput: string;
  flash: string;
}

class LoginScreen extends React.Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
      flash: ''
    };
  }

  componentDidMount() {
    if (this.props.router.query) {
      if (this.props.router.query.from === 'Logout') {
        toast(<ToastText>ログアウトしました！</ToastText>);
      }
      if (this.props.router.query.from === 'SignUpScreen') {
        toast(<ToastText>アカウントを作成しました！</ToastText>);
      }
    }
  }

  postLoginInput(emailInput: string, passwordInput: string) {
    axios
      .post(`${API_URL}login`, {
        email: emailInput,
        password: passwordInput
      })
      .then(result => {
        if (result.data.token) {
          localStorage.setItem('token', result.data.token);
          Router.push({
            pathname: '/ToDoScreen',
            query: { from: 'LoginScreen' }
          });
        }
        if (result.data.errors) {
          this.setState({ flash: result.data.errors });
        }
      });
  }

  render() {
    const { emailInput, passwordInput, flash } = this.state;
    const { isLogin, isLoading } = this.props;

    return isLoading ? null : !isLogin ? (
      <Wrapper>
        <Title>Log In</Title>
        <FlashText>{flash}</FlashText>
        <LoginWrapper>
          <TextInput
            type="text"
            placeholder="Email"
            value={emailInput}
            onChange={e => this.onChangeEmailInput(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Password"
            value={passwordInput}
            onChange={e => this.onChangePasswordInput(e.target.value)}
          />
          <LoginButton
            onClick={() => this.postLoginInput(emailInput, passwordInput)}
          >
            login
          </LoginButton>
          <NavigateSignUpText>
            アカウントをお持ちでない方は
            <Here onClick={() => Router.push('/SignUpScreen')}>こちら</Here>
          </NavigateSignUpText>
        </LoginWrapper>
        <ToastContainer />
      </Wrapper>
    ) : (
      <Wrapper>
        <AlreadyLoginText>既にログインしています。</AlreadyLoginText>
      </Wrapper>
    );
  }

  private onChangeEmailInput = (value: string) => {
    this.setState({ emailInput: value });
  };

  private onChangePasswordInput = (value: string) => {
    this.setState({ passwordInput: value });
  };
}

export default withSectionAndHeader(withLoginUser(withRouter(LoginScreen)));
