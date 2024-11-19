import { Button, Col, Menu, MenuProps, Row } from 'antd';
import logo from 'asset/img/logo.png';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import LocalePickerContainer from 'components/locale/LocalePickerContainer';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, className?: string, icon?: React.ReactNode): MenuItem {
  return {
    key,
    icon,
    label,
    className,
  } as MenuItem;
}

export interface IPageLayoutViewHeaderOwnProps {}

type IPageLayoutViewHeaderProps = IPageLayoutViewHeaderOwnProps & IWithLocalizeOwnProps;

const PageLayoutViewHeader: React.FC<IPageLayoutViewHeaderProps> = (props: IPageLayoutViewHeaderProps) => {
  const navigator = useNavigate();
  const location = useLocation();

  const currentTab = useMemo(() => location.pathname.substring(location.pathname.indexOf('/')), [location.pathname]);

  const handleMenuSelect: MenuProps['onClick'] = (e) => {
    navigator(e.key);
  };

  const items: MenuProps['items'] = [
    getItem(props.translate('NAVIGATION.INFO'), '/'),
    getItem(<Button className="pageLayoutViewHeader__button">{props.translate('NAVIGATION.LOGIN')}</Button>, '/login'),
    getItem(
      <Button type="primary" className="pageLayoutViewHeader__button">
        {props.translate('NAVIGATION.CREATE')}
      </Button>,
      '/create'
    ),
  ];

  return (
    <Row justify={'space-between'} className="fullWidth">
      <Col span={4} className="pageLayoutViewHeader__imgContainer">
        <img src={logo} className="pageLayoutViewHeader__img" alt="" />
      </Col>

      <Col span={16}>
        <Menu className="pageLayoutViewHeader__menuContainer" onClick={handleMenuSelect} selectedKeys={[currentTab]} items={items} mode="horizontal" disabledOverflow={true} />
      </Col>
      <Col span={2}>
        <LocalePickerContainer />
      </Col>
    </Row>
  );
};

export default withLocalize(PageLayoutViewHeader as any);
