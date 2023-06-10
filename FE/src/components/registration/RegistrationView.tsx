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
import React, { useCallback } from "react";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { RuleObject } from "antd/es/form";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { IRegistrationPayload } from "../../service/business/registration/RegistrationBusinessStore";
import notificationService from "../../service/util/notificationService";

export interface IRegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegistrationViewOwnProps {
  onGoogleLogin: (googleCredential: CredentialResponse) => void;
  onRegistration: (registrationValues: IRegistrationPayload) => void;
}

type IRegistrationViewProps = IRegistrationViewOwnProps;

const RegistrationView: React.FC<IRegistrationViewProps> = (
  props: IRegistrationViewProps
) => {
  const [form] = Form.useForm<IRegistrationForm>();

  const validatePassword = useCallback((rule: RuleObject, value: string) => {
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
  }, []);

  const validateConfirmPassword = useCallback(
    (rule: RuleObject, value: string) => {
      const password = form.getFieldValue("password");
      if (password === value) {
        return Promise.resolve();
      } else {
        return Promise.reject("Make sure your passwords match.");
      }
    },
    []
  );

  const handleFinish = useCallback((values: IRegistrationForm) => {
    props.onRegistration({ email: values.email, password: values.password });
  }, []);

  return (
    <Row className="fullScreen">
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className="loginView__form">
        <Row justify={"center"}>
          <Title className="loginView__title">forget-me-not</Title>
        </Row>
        <Row justify={"center"}>
          <Title level={3} className="loginView__title">
            Welcome to forget-me-not
          </Title>
        </Row>
        <Form<IRegistrationForm>
          form={form}
          onFinish={handleFinish}
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
                type: "email",
                message: "The input is not a valid e-mail.",
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
            rules={[
              { required: true, message: "Please input a password." },
              { validator: validatePassword },
            ]}
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
            rules={[
              { required: true, message: "Please input a password." },
              { validator: validateConfirmPassword },
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
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
                Sign up
              </Button>
            </Col>
          </Row>
          <Divider>Or</Divider>
          <Row justify={"center"}>
            <GoogleLogin
              onSuccess={props.onGoogleLogin}
              onError={() =>
                notificationService.error("Unable to sign up with Google")
              }
            />
          </Row>
          <Row justify={"center"} align={"middle"} className="margin-top-md">
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

export default RegistrationView;
