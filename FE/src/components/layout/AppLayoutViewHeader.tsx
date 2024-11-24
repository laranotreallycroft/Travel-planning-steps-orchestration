import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Col, Menu, MenuProps, Row } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import logo from 'asset/img/logo.png';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import LocalePickerContainer from 'components/locale/LocalePickerContainer';
import React from 'react';

export interface IAppLayoutViewHeaderOwnProps {
  collapsed: boolean;
  isUserLoggedIn: boolean;
  currentTab: string;
  menuItems: ItemType[];
  onMenuItemSelect: MenuProps['onClick'];
  onLogin: () => void;
  onUserCreate: () => void;
  onLogout: () => void;
  onToggleSiderCollapsed: () => void;
}

type IAppLayoutViewHeaderProps = IAppLayoutViewHeaderOwnProps & IWithLocalizeOwnProps;

const AppLayoutViewHeader: React.FC<IAppLayoutViewHeaderProps> = (props: IAppLayoutViewHeaderProps) => {
  return (
    <Row justify={'space-between'} className="fullWidth">
      <Col span={1} md={8} className="appLayoutViewHeader__imgContainer">
        <img src={logo} className="appLayoutViewHeader__img" alt="" />
      </Col>

      <Col lg={8} className="appLayoutViewHeader__menuContainer appLayoutView__screen-lg">
        <Menu onClick={props.onMenuItemSelect} selectedKeys={[props.currentTab]} items={props.menuItems} mode="horizontal" disabledOverflow={true} />
      </Col>
      <Col lg={8} className="appLayoutView__screen-lg">
        <Row gutter={[8, 8]} justify={'end'}>
          {props.isUserLoggedIn ? (
            <Col>
              <Button onClick={props.onLogout}>{props.translate('NAVIGATION.LOGOUT')}</Button>
            </Col>
          ) : (
            <React.Fragment>
              <Col>
                <Button onClick={props.onLogin}>{props.translate('NAVIGATION.LOGIN')}</Button>
              </Col>
              <Col>
                <Button onClick={props.onUserCreate} type="primary">
                  {props.translate('NAVIGATION.CREATE')}
                </Button>
              </Col>
            </React.Fragment>
          )}
          <Col>
            <LocalePickerContainer />
          </Col>
        </Row>
      </Col>
      <Col className="appLayoutView__screen-md">
        <Button className="appLayoutViewHeader__siderButton" type="text" size="large" icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={props.onToggleSiderCollapsed} />
      </Col>
    </Row>
  );
};

export default withLocalize<IAppLayoutViewHeaderOwnProps>(AppLayoutViewHeader as any);
