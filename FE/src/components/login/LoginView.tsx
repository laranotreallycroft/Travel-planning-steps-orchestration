import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Button, Checkbox, Col, Divider, Form, Input, Row, Typography } from 'antd';
import logo from 'asset/img/logo.png';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import React from 'react';
import { Link } from 'react-router-dom';
import { ILoginPayload } from 'service/business/login/LoginBusinessStore';
import notificationService from 'service/util/notificationService';

export interface ILoginViewOwnProps {
  onGoogleLogin: (googleCredential: CredentialResponse) => void;
  onLogin: (loginValues: ILoginPayload) => void;
}

type ILoginViewProps = ILoginViewOwnProps & IWithLocalizeOwnProps;

const LoginView: React.FC<ILoginViewProps> = (props: ILoginViewProps) => {
  const [form] = Form.useForm<ILoginPayload>();

  return (
    <Row justify={'center'} align={'middle'} className="fullHeight">
      <Col xs={20} sm={16} md={12} lg={10} xl={8}>
        <div className="loginView__imgWrapper">
          <Link to="/" className="loginView__imgLink">
            <img src={logo} className="loginView__img" alt="logo" />
          </Link>
        </div>
        <Form<ILoginPayload>
          form={form}
          onFinish={props.onLogin}
          requiredMark={false}
          className="fullWidth"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              form.submit();
            }
          }}
          action="/login" // Action triggers browser's credential management
          method="post" // Indicates this is a login form
        >
          <Form.Item
            name={'email'}
            rules={[
              {
                required: true,
                message: props.translate('LOGIN_VIEW.FORM.EMAIL_MESSAGE'),
              },
            ]}
          >
            <Input placeholder={props.translate('LOGIN_VIEW.FORM.EMAIL_PLACEHOLDER')} size="large" name="email" type="email" />
          </Form.Item>
          <Form.Item
            name={'password'}
            rules={[
              {
                required: true,
                message: props.translate('LOGIN_VIEW.FORM.PASSWORD_MESSAGE'),
              },
            ]}
          >
            <Input.Password placeholder={props.translate('LOGIN_VIEW.FORM.PASSWORD_PLACEHOLDER')} size="large" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} name="password" type="password" />
          </Form.Item>
          <Form.Item name={'keepSignedin'} valuePropName="checked">
            <Checkbox>{props.translate('LOGIN_VIEW.FORM.KEEP_SIGNED_IN')}</Checkbox>
          </Form.Item>
          <Row justify={'center'} className="margin-top-xxl">
            <Col xs={22} sm={22} md={12} lg={12} xl={12}>
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
