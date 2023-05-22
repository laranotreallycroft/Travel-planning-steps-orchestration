import { googleLogout } from "@react-oauth/google";
import { Button, Row } from "antd";
import React from "react";

export interface ILogoutForm {}
export interface ILogoutViewOwnProps {}

type ILogoutViewProps = ILogoutViewOwnProps;

const LogoutView: React.FC<ILogoutViewProps> = (props: ILogoutViewProps) => {
  return (
    <Row className="fullHeight">
      <Button onClick={googleLogout}>Logout</Button>
    </Row>
  );
};

export default LogoutView;
