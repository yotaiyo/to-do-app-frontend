import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Router from 'next/router';
import { withLoginUser, withLoginUserState } from '../components/withLoginUser';
import { withSectionAndHeader } from '../components/withSectionAndHeader';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

const Wrapper = styled.div``;

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

const SignUpWrapper = styled.div`
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

const SignUpButton = styled.div`
  margin-top: 10px;
  background-color: #003399;
  color: white;
  padding: 3px;
  margin: 0px auto;
  margin-top: 20px;
  text-align: center;
  width: 80px;
`;

const FlashText = styled.div`
  text-align: center;
  margin-top: 10px;
  color: #cc3300;
`;

const Flashs: React.FC<{ flashList: [] }> = ({ flashList }) => {
  return (
    <>
      {flashList.map(flash => {
        return <FlashText>{flash}</FlashText>;
      })}
    </>
  );
};

interface SignUpProps extends withLoginUserState {}

interface SignUpState {
  emailInput: string;
  userNameInput: string;
  passwordInput: string;
  passwordConfirmationInput: string;
  flashList: [];
}

class SignUpScreen extends React.Component<SignUpProps, SignUpState> {
  constructor(props: any) {
    super(props);
    this.state = {
      emailInput: '',
      userNameInput: '',
      passwordInput: '',
      passwordConfirmationInput: '',
      flashList: []
    };
  }

  postSignUpInput(
    emailInput: string,
    userNameInput: string,
    passwordInput: string,
    passwordConfirmationInput: string
  ) {
    axios
      .post(`${API_URL}/users`, {
        user: {
          email: emailInput,
          name: userNameInput,
          password: passwordInput,
          password_confirmation: passwordConfirmationInput
        }
      })
      .then(result => {
        if (result.data.errors) {
          console.log(result);
          this.setState({ flashList: result.data.errors });
        } else {
          console.log(result);
          Router.push({
            pathname: '/LoginScreen',
            query: { from: 'SignUpScreen' }
          });
        }
      });
  }

  render() {
    const {
      emailInput,
      userNameInput,
      passwordInput,
      passwordConfirmationInput,
      flashList
    } = this.state;
    const { isLogin, isLoading } = this.props;

    return isLoading ? null : !isLogin ? (
      <Wrapper>
        <Title>Sign Up</Title>
        <Flashs flashList={flashList} />
        <SignUpWrapper>
          <TextInput
            type="text"
            placeholder="Email"
            value={emailInput}
            onChange={e => this.onChangeEmailInput(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Username"
            value={userNameInput}
            onChange={e => this.onChangeUserNameInput(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Password"
            value={passwordInput}
            onChange={e => this.onChangePasswordInput(e.target.value)}
          />
          <TextInput
            type="text"
            placeholder="Confirmation"
            value={passwordConfirmationInput}
            onChange={e =>
              this.onChangePasswordConfirmationInput(e.target.value)
            }
          />
          <SignUpButton
            onClick={() => {
              this.postSignUpInput(
                emailInput,
                userNameInput,
                passwordInput,
                passwordConfirmationInput
              );
              console.log('aaaaaaaaaaaa');
            }}
          >
            sign up
          </SignUpButton>
        </SignUpWrapper>
      </Wrapper>
    ) : null;
  }

  private onChangeEmailInput = (value: string) => {
    this.setState({ emailInput: value });
  };

  private onChangeUserNameInput = (value: string) => {
    this.setState({ userNameInput: value });
  };

  private onChangePasswordInput = (value: string) => {
    this.setState({ passwordInput: value });
  };

  private onChangePasswordConfirmationInput = (value: string) => {
    this.setState({ passwordConfirmationInput: value });
  };
}

export default withSectionAndHeader(withLoginUser(SignUpScreen));
