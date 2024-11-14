import { Col, Row } from "antd";
import logo from "asset/img/logo.png";
import withLocalize, {
  IWithLocalizeOwnProps,
} from "components/common/localize/withLocalize";
import React from "react";

export interface IPageLayoutViewHeaderOwnProps {}

type IPageLayoutViewHeaderProps = IPageLayoutViewHeaderOwnProps &
  IWithLocalizeOwnProps;

const PageLayoutViewHeader: React.FC<IPageLayoutViewHeaderProps> = (
  props: IPageLayoutViewHeaderProps
) => {
  return (
    <React.Fragment>
      <div className="pageLayoutViewHeader__imgContainer">
        <img src={logo} className="pageLayoutViewHeader__img" alt="" />
      </div>
      <Row
        align={"middle"}
        justify={"center"}
        gutter={[16, 16]}
        className="fullWidth"
      >
        <Col>{props.translate("NAVIGATION.INFO")}</Col>
      </Row>
    </React.Fragment>
  );
};

export default withLocalize(PageLayoutViewHeader as any);
