import React from 'react';
import styled from 'styled-components';
import { withLoginUser, withLoginUserState } from './withLoginUser';

const Wrapper = styled.div`
  font-family: 'Vollkorn', serif;
  font-size: 30px;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.5);
  padding: 10px;
  padding-left: 30px;
`;

interface HeaderProps extends withLoginUserState {}

class Header extends React.Component<HeaderProps, {}> {
  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    const { isLoading } = this.props;
    return isLoading ? null : <Wrapper>yotaiyo-to-do-app</Wrapper>;
  }
}

export default withLoginUser(Header);
