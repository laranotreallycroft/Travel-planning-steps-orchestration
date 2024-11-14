import { Col, Row } from "antd";
import logo from "asset/img/logo.png";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface IPageLayoutViewHeaderOwnProps {}

type IPageLayoutViewHeaderProps = IPageLayoutViewHeaderOwnProps;

const PageLayoutViewHeader: React.FC<IPageLayoutViewHeaderProps> = (
  props: IPageLayoutViewHeaderProps
) => {
  const navigate = useNavigate();

  return (
    <Row align={"middle"} gutter={[16, 16]} className="fullWidth">
      <Col
        xs={0}
        sm={10}
        md={6}
        lg={6}
        xl={4}
        className="pageLayoutViewHeader__col"
      >
        <img src={logo} className="pageLayoutViewHeader__img" />
      </Col>

      <Col>how it works</Col>
    </Row>
  );
};

export default PageLayoutViewHeader;
