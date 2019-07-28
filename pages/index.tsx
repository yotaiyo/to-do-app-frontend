import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { withLoginUser, withLoginUserState } from '../components/withLoginUser';
import { withSectionAndHeader } from '../components/withSectionAndHeader';

const Wrapper = styled.div``;

const Title = styled.div`
  text-align: center;
  font-size: 60px;
  margin-top: 200px;
`;

const SignUpButton = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 25px;
  background-color: #003399;
  color: white;
  padding: 3px;
  margin-top: 20px;
  width: 150px;
`;

interface HomeScreenProps extends withLoginUserState {}

interface HomeScreenState {}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  constructor(props: HomeScreenProps) {
    super(props);
  }

  render() {
    const { isLogin, isLoading } = this.props;
    return isLoading ? null : (
      <Wrapper>
        <Title>Welcome to yotaiyo-to-do-app</Title>
        {!isLogin ? (
          <Link href="/SignUpScreen">
            <SignUpButton>Sign Up!</SignUpButton>
          </Link>
        ) : null}
      </Wrapper>
    );
  }
}

export default withSectionAndHeader(withLoginUser(HomeScreen));
