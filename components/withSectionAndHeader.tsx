import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Section from './Section';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Vollkorn', serif;
`;

const LeftWrapper = styled.div`
  border-right: solid 1px #cccccc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 1500px;
`;

const RightWrapper = styled.div`
  flex: 1;
`;

interface withSectionAndHeaderProps {}

interface withSectionAndHeaderState {}

export function withSectionAndHeader(WrappedComponent: any) {
  return class extends React.Component<
    withSectionAndHeaderProps,
    withSectionAndHeaderState
  > {
    constructor(props: withSectionAndHeaderProps) {
      super(props);
    }

    render() {
      return (
        <Wrapper>
          <LeftWrapper>
            <Section />
          </LeftWrapper>
          <RightWrapper>
            <Header />
            <WrappedComponent {...this.props} />
          </RightWrapper>
        </Wrapper>
      );
    }
  };
}
