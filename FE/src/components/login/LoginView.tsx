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
import { ILoginPayload } from "../../service/business/login/LoginBusinessStore";

export interface ILoginForm {
  email: string;
  password: string;
}
export interface ILoginViewOwnProps {
  onGoogleLogin: (response: CredentialResponse) => void;
  onLogin: (loginValues: ILoginPayload) => void;
}

type ILoginViewProps = ILoginViewOwnProps;

const LoginView: React.FC<ILoginViewProps> = (props: ILoginViewProps) => {
  const [form] = Form.useForm<ILoginForm>();

  const handleFinish = (values: ILoginForm) => {
    props.onLogin(values);
  };

  return (
    <Row className="fullHeight">
      <Col span={12} className="loginView__form ">
        <Row justify={"center"}>
          <Title className="loginView__title">Travel app</Title>
        </Row>
        <Row justify={"center"}>
          <Title level={3} className="loginView__title">
            Welcome to Travel app
          </Title>
        </Row>
        <Form<ILoginForm>
          form={form}
          onFinish={handleFinish}
          className="fullWidth"
        >
          <Form.Item
            name={"email"}
            label={"Email"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name={"password"}
            label={"Password"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Row justify={"center"}>
            <Button
              className="loginView__button"
              type="primary"
              onClick={form.submit}
            >
              Sign in
            </Button>
          </Row>
          <Divider>Or</Divider>
          <Row justify={"center"}>
            <GoogleLogin
              onSuccess={props.onGoogleLogin}
              onError={() => console.log("A")}
            />
          </Row>
          <Row justify={"center"} className="margin-top-md">
            New to Travel App?
            <Typography.Link href={"/registration"} className="margin-left-sm">
              Create Account
            </Typography.Link>
          </Row>
        </Form>
      </Col>
      <Col span={12}>
        <Carousel className="loginView__carousel">
          <div className="loginView__carouselImage">
            <Row justify={"center"}>
              <Title className="loginView__title">
                Please log in to use the app
              </Title>
            </Row>
          </div>
          <div className="loginView__carouselImage">
            <Row justify={"center"}>
              <Title className="loginView__title">
                Please log in to use the app
              </Title>
            </Row>
          </div>
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
