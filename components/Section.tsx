import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { withLoginUser, withLoginUserState } from './withLoginUser';

const Wrapper = styled.div`
  font-size: 20px;
  border-right: solid 1px #c0c0c0;
`;

const SectionWrapper = styled.div`
  border-bottom: solid 1px #c0c0c0;
  padding: 20px;
  :hover {
    background-color: #eeeeee;
  }
`;

interface SectionProps extends withLoginUserState {}

interface SectionState {}

class Section extends React.Component<SectionProps, SectionState> {
  constructor(props: SectionProps) {
    super(props);
  }

  logout() {
    localStorage.removeItem('token');
    Router.push({ pathname: '/LoginScreen', query: { from: 'Logout' } });
  }

  render() {
    const { isLogin, isLoading } = this.props;
    return isLoading ? null : (
      <Wrapper>
        <Link href="/AboutScreen">
          <SectionWrapper>yotaiyo-to-do-appとは</SectionWrapper>
        </Link>
        <Link href="/">
          <SectionWrapper>ホーム</SectionWrapper>
        </Link>
        <Link href="/ToDoScreen">
          <SectionWrapper>タスク管理</SectionWrapper>
        </Link>
        {isLogin ? (
          <SectionWrapper onClick={() => this.logout()}>
            ログアウト
          </SectionWrapper>
        ) : (
          <Link href="/LoginScreen">
            <SectionWrapper>ログイン</SectionWrapper>
          </Link>
        )}
      </Wrapper>
    );
  }
}

export default withLoginUser(Section);
