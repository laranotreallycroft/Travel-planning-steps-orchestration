import React from "react";

import withLocalize, {
  IWithLocalizeOwnProps,
} from "components/common/localize/withLocalize";

import { MenuInfo } from "rc-menu/lib/interface";
import { SaveAltOutlined } from "@mui/icons-material";
import { Col, Menu, Row } from "antd";
import { LABELS, MESSAGES } from "service/locale/message";

// -- Prop types
// ----------

export interface ILocalePickerOwnProps {
  onLocaleChange: (menuInfo: MenuInfo) => void;
  locale: string;
  standalone?: boolean;
}

export interface ILocalePickerStateProps {}

export interface ILocalePickerDispatchProps {}
type ILocalePickerProps = ILocalePickerOwnProps &
  ILocalePickerStateProps &
  ILocalePickerDispatchProps &
  IWithLocalizeOwnProps;

// -- Component
// ----------

/** Menu component for picking app locale */
const LocalePicker: React.FC<ILocalePickerProps> = (props) => {
  return (
    <Menu
      triggerSubMenuAction="click"
      mode={props.standalone ? "horizontal" : "vertical"}
      overflowedIndicator={null}
      onClick={props.onLocaleChange}
      defaultSelectedKeys={[props.locale]}
      className={"lemon-headerMenu__languageMenu"}
    >
      <Menu.SubMenu
        key="lemon-localeMenu"
        title={
          <Row align="middle" gutter={8}>
            <Col>
              {props.standalone ? (
                <SaveAltOutlined />
              ) : (
                props.translate("LOGIN_MENU.LANGUAGE_LABEL")
              )}
            </Col>

            {props.standalone && (
              <Col>
                <SaveAltOutlined />
              </Col>
            )}
          </Row>
        }
        className={"lemon-headerMenu__languageMenu"}
      >
        {Object.keys(MESSAGES).map((locale) => {
          return <Menu.Item key={locale}>{LABELS[locale]}</Menu.Item>;
        })}
      </Menu.SubMenu>
    </Menu>
  );
};

// -- HOCs and exports
// ----------

export default withLocalize<ILocalePickerOwnProps>(LocalePicker as any);
