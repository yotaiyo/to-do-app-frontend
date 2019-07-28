import React from 'react';
import styled from 'styled-components';
import { withSectionAndHeader } from '../components/withSectionAndHeader';
import { withLoginUser, withLoginUserState } from '../components/withLoginUser';

const Wrapper = styled.div``;

const CardWrapper = styled.div`
  box-shadow: 0px 0px 6px 0.05px rgba(0, 0, 0, 0.5);
  margin-top: 30px;
  margin-left: 100px;
  margin-right: 100px;
  border-radius: 10px;
  padding: 20px;
`;

const CardTitle = styled.div`
  font-size: 25px;
`;

const CardBody = styled.div`
  margin-left: 20px;
`;

interface AboutProps extends withLoginUserState {}

class AboutScreen extends React.Component<AboutProps, {}> {
  constructor(props: AboutProps) {
    super(props);
  }
  render() {
    const { isLoading } = this.props;
    return isLoading ? null : (
      <Wrapper>
        <CardWrapper>
          <CardTitle>yotaiyo-to-do-appとは</CardTitle>
          <CardBody>
            タスクの追加、完了、フィルタリング、締め切りの設定、ソートといった機能が使用できるタスク管理アプリケーションです。
          </CardBody>
        </CardWrapper>
        <CardWrapper>
          <CardTitle>使用技術</CardTitle>
          <CardBody>
            フロントエンド: Next.js、バックエンド: Ruby on
            Railsで構成されています。
          </CardBody>
        </CardWrapper>
        <CardWrapper>
          <CardTitle>ソースコード</CardTitle>
          <CardBody>
            <a
              href={'https://github.com/yotaiyo/yotaiyo-to-do-app-react-rails'}
            >
              こちら
            </a>
            で公開しています。
          </CardBody>
        </CardWrapper>
      </Wrapper>
    );
  }
}

export default withLoginUser(withSectionAndHeader(AboutScreen));
