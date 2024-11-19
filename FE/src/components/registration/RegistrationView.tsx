import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import { RuleObject } from 'antd/es/form';
import logo from 'asset/img/logo.png';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { IRegistrationPayload } from 'service/business/registration/RegistrationBusinessStore';
import notificationService from 'service/util/notificationService';

export interface IRegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegistrationViewOwnProps {
  onGoogleLogin: (googleCredential: CredentialResponse) => void;
  onRegistration: (registrationValues: IRegistrationPayload) => void;
}

type IRegistrationViewProps = IRegistrationViewOwnProps & IWithLocalizeOwnProps;

const RegistrationView: React.FC<IRegistrationViewProps> = (props: IRegistrationViewProps) => {
  const [form] = Form.useForm<IRegistrationForm>();

  const validatePassword = useCallback((rule: RuleObject, value: string) => {
    if (value && (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value))) return Promise.reject(props.translate('REGISTRATION_VIEW.PASSWORD_VALIDATION.REJECT'));
    return Promise.resolve();
  }, []);

  const validateConfirmPassword = useCallback((rule: RuleObject, value: string) => {
    const password = form.getFieldValue('password');
    if (password === value) {
      return Promise.resolve();
    } else {
      return Promise.reject(props.translate('REGISTRATION_VIEW.PASSWORD_VALIDATION.NOT_THE_SAME'));
    }
  }, []);

  const handleFinish = useCallback((values: IRegistrationForm) => {
    props.onRegistration({ email: values.email, password: values.password });
  }, []);

  return (
    <Row justify={'center'} align={'middle'} className="fullHeight">
      <Col span={6}>
        <div className="loginView__imgWrapper">
          <Link to="/" className="loginView__imgLink">
            <img src={logo} className="loginView__img" alt="logo" />
          </Link>
        </div>
        <Form<IRegistrationForm> form={form} onFinish={handleFinish} className="fullWidth">
          <Form.Item
            name={'email'}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                type: 'email',
                message: props.translate('REGISTRATION_VIEW.FORM.EMAIL_MESSAGE'),
              },
            ]}
          >
            <Input placeholder={props.translate('REGISTRATION_VIEW.FORM.EMAIL_PLACEHOLDER')} size="large" />
          </Form.Item>
          <Form.Item
            name={'password'}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: props.translate('REGISTRATION_VIEW.FORM.PASSWORD_MESSAGE'),
              },
              { validator: validatePassword },
            ]}
          >
            <Input.Password placeholder={props.translate('REGISTRATION_VIEW.FORM.PASSWORD_PLACEHOLDER')} size="large" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
          <Form.Item
            name={'confirmPassword'}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: props.translate('REGISTRATION_VIEW.FORM.PASSWORD_MESSAGE'),
              },
              { validator: validateConfirmPassword },
            ]}
          >
            <Input.Password placeholder={props.translate('REGISTRATION_VIEW.FORM.CONFIRM_PASSWORD_PLACEHOLDER')} size="large" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
          <Row justify={'center'}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Button className="fullWidth" type="primary" onClick={form.submit}>
                {props.translate('REGISTRATION_VIEW.SIGN_UP')}
              </Button>
            </Col>
          </Row>
          <Divider>{props.translate('REGISTRATION_VIEW.OR')}</Divider>
          <Row justify={'center'}>
            <GoogleLogin onSuccess={props.onGoogleLogin} onError={() => notificationService.error(props.translate('REGISTRATION_VIEW.GOOGLE_SIGN_UP_FAIL'))} />
          </Row>
          <Row justify={'center'} align={'middle'} className="margin-top-md">
            <Typography.Link href={'/login'} className="margin-left-sm">
              {props.translate('REGISTRATION_VIEW.LOG_IN')}
            </Typography.Link>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default withLocalize<IRegistrationViewOwnProps>(RegistrationView as any);
