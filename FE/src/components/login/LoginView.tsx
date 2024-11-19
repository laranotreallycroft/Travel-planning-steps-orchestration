import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import logo from 'asset/img/logo.png';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import React from 'react';
import { Link } from 'react-router-dom';
import { ILoginPayload } from 'service/business/login/LoginBusinessStore';
import notificationService from 'service/util/notificationService';

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginViewOwnProps {
  onGoogleLogin: (googleCredential: CredentialResponse) => void;
  onLogin: (loginValues: ILoginPayload) => void;
}

type ILoginViewProps = ILoginViewOwnProps & IWithLocalizeOwnProps;

const LoginView: React.FC<ILoginViewProps> = (props: ILoginViewProps) => {
  const [form] = Form.useForm<ILoginForm>();

  return (
    <Row justify={'center'} align={'middle'} className="fullHeight">
      <Col span={6}>
        <div className="loginView__imgWrapper">
          <Link to="/" className="loginView__imgLink">
            <img src={logo} className="loginView__img" alt="logo" />
          </Link>
        </div>
        <Form<ILoginForm> form={form} onFinish={props.onLogin} requiredMark={false} className="fullWidth">
          <Form.Item
            name={'email'}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: props.translate('LOGIN_VIEW.FORM.EMAIL_MESSAGE'),
              },
            ]}
          >
            <Input placeholder={props.translate('LOGIN_VIEW.FORM.EMAIL_PLACEHOLDER')} size="large" />
          </Form.Item>
          <Form.Item
            name={'password'}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: props.translate('LOGIN_VIEW.FORM.PASSWORD_MESSAGE'),
              },
            ]}
          >
            <Input.Password placeholder={props.translate('LOGIN_VIEW.FORM.PASSWORD_PLACEHOLDER')} size="large" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
          <Row justify={'center'} className="margin-top-xxl">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Button className="fullWidth" type="primary" onClick={form.submit}>
                {props.translate('LOGIN_VIEW.SIGN_IN')}
              </Button>
            </Col>
          </Row>
          <Divider>{props.translate('LOGIN_VIEW.OR')}</Divider>
          <Row justify={'center'}>
            <GoogleLogin onSuccess={props.onGoogleLogin} onError={() => notificationService.error(props.translate('LOGIN_VIEW.GOOGLE_LOGIN_FAIL'))} />
          </Row>
          <Row justify={'center'} align={'middle'} className="margin-top-md">
            <Typography.Link href={'/create'} className="margin-left-sm">
              {props.translate('LOGIN_VIEW.SIGN_UP')}
            </Typography.Link>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default withLocalize<ILoginViewOwnProps>(LoginView as any);
