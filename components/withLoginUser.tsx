import React from 'react';
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

interface withLoginUserProps {}

export interface withLoginUserState {
  isLogin: boolean;
  userId: number | null;
  isLoading: boolean;
}

export function withLoginUser(WrappedComponent: any) {
  return class extends React.Component<withLoginUserProps, withLoginUserState> {
    constructor(props: withLoginUserProps) {
      super(props);
      this.state = {
        isLogin: false,
        userId: null,
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
          }
        })
        .finally(() => this.setState({ isLoading: false }));
    }

    render() {
      return (
        <WrappedComponent
          isLogin={this.state.isLogin}
          userId={this.state.userId}
          isLoading={this.state.isLoading}
          {...this.props}
        />
      );
    }
  };
}
