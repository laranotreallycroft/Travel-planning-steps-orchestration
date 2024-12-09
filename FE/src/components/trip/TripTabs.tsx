import { CloudOutlined, ScheduleOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';

import { Menu, MenuProps } from 'antd';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface ITripTabsOwnProps {}

type ITripTabsProps = ITripTabsOwnProps;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon: React.ReactNode, className?: string): MenuItem {
  return {
    key,
    icon,
    label,
    className,
  } as MenuItem;
}
const items: MenuProps['items'] = [getItem('Weather', 'weather', <CloudOutlined />), getItem('Itinerary', 'itinerary', <ScheduleOutlined />), getItem('Packing list', 'packinglist', <UnorderedListOutlined />), getItem('Settings', 'settings', <SettingOutlined />)];

const TripTabs: React.FC<ITripTabsProps> = (props: ITripTabsProps) => {
  const navigator = useNavigate();
  const location = useLocation();

  const currentTab = useMemo(() => location.pathname.substring(location.pathname.lastIndexOf('/') + 1), [location.pathname]);

  const handleMenuSelect: MenuProps['onClick'] = (e) => {
    navigator(e.key);
  };

  return <Menu className="margin-bottom-lg" onClick={handleMenuSelect} mode="horizontal" selectedKeys={[currentTab]} items={items} />;
};

export default TripTabs;
