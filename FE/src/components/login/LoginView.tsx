import {
  Button,
  Carousel,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ILoginPayload } from "service/business/login/LoginBusinessStore";
import notificationService from "service/util/notificationService";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginViewOwnProps {
  onGoogleLogin: (googleCredential: CredentialResponse) => void;
  onLogin: (loginValues: ILoginPayload) => void;
}

type ILoginViewProps = ILoginViewOwnProps;

const LoginView: React.FC<ILoginViewProps> = (props: ILoginViewProps) => {
  const [form] = Form.useForm<ILoginForm>();

  return (
    <Row className="fullScreen">
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className="loginView__form ">
        <Row justify={"center"}>
          <Title className="loginView__title">forget-me-not</Title>
        </Row>
        <Row justify={"center"}>
          <Title level={3} className="loginView__title">
            Welcome to forget-me-not
          </Title>
        </Row>
        <Form<ILoginForm>
          form={form}
          onFinish={props.onLogin}
          requiredMark={false}
          className="fullWidth"
        >
          <Form.Item
            name={"email"}
            label={"Email"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input an e-mail",
              },
            ]}
          >
            <Input placeholder="Input email" />
          </Form.Item>
          <Form.Item
            name={"password"}
            label={"Password"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please input a password" }]}
          >
            <Input.Password
              placeholder="Input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Row justify={"center"}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Button
                className="fullWidth"
                type="primary"
                onClick={form.submit}
              >
                Sign in
              </Button>
            </Col>
          </Row>
          <Divider>Or</Divider>
          <Row justify={"center"}>
            <GoogleLogin
              onSuccess={props.onGoogleLogin}
              onError={() =>
                notificationService.error("Unable to log in with Google")
              }
            />
          </Row>
          <Row justify={"center"} align={"middle"} className="margin-top-md">
            New to forget-me-not?
            <Typography.Link href={"/create"} className="margin-left-sm">
              Create Account
            </Typography.Link>
          </Row>
        </Form>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Carousel className="loginView__carousel">
          <div className="loginView__carouselImage">
            <Row justify={"center"}>
              <Title className="loginView__title">
                Please log in to use the app
              </Title>
            </Row>
          </div>
        </Carousel>
      </Col>
    </Row>
  );
};

export default LoginView;
