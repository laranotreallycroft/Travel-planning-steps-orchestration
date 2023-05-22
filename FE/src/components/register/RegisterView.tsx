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
import { RuleObject } from "antd/es/form";

export interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface IRegisterViewOwnProps {}

type IRegisterViewProps = IRegisterViewOwnProps;

const RegisterView: React.FC<IRegisterViewProps> = (
  props: IRegisterViewProps
) => {
  const [form] = Form.useForm<IRegisterForm>();

  const validatePassword = (rule: RuleObject, value: string) => {
    if (
      value.length < 8 ||
      !/[A-Z]/.test(value) ||
      !/[a-z]/.test(value) ||
      !/\d/.test(value)
    )
      return Promise.reject(
        "Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number"
      );
    return Promise.resolve();
  };

  const validateConfirmPassword = (rule: RuleObject, value: string) => {
    const password = form.getFieldValue("password");
    if (password === value) {
      return Promise.resolve();
    } else {
      return Promise.reject("Make sure your passwords match.");
    }
  };
  return (
    <Row className="fullHeight loginView_container">
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className="loginView__form">
        <Row justify={"center"}>
          <Title className="loginView__title">Travel app</Title>
        </Row>
        <Row justify={"center"}>
          <Title level={3} className="loginView__title">
            Welcome to Travel app
          </Title>
        </Row>
        <Form form={form}>
          <Form.Item
            name={"email"}
            label={"Email"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                type: "email",
                message: "The input is not valid E-mail.",
              },
            ]}
          >
            <Input placeholder="Input Email" />
          </Form.Item>
          <Form.Item
            name={"password"}
            label={"Password"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true }, { validator: validatePassword }]}
          >
            <Input.Password
              placeholder="Input Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name={"confirmPassword"}
            label={"Confirm Password"}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true }, { validator: validateConfirmPassword }]}
          >
            <Input.Password
              placeholder="Confirm Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Row justify={"center"}>
            <Button className="loginView" type="primary" onClick={form.submit}>
              Sign in
            </Button>
          </Row>
          <Divider>Or</Divider>
          <Row>SIGN WITH GOOGLE</Row>
          <Row>
            Already have an account?
            <Typography.Link href={"/login"} className="margin-left-sm">
              Login
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

export default RegisterView;
