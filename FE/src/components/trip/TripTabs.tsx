import { CalendarOutlined, CloudOutlined, ScheduleOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { atcb_action } from 'add-to-calendar-button';
import { Menu, MenuProps } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { ITrip } from 'model/trip/Trip';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface ITripTabsOwnProps {
  trip: ITrip;
}

type ITripTabsProps = ITripTabsOwnProps & IWithLocalizeOwnProps;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, className?: string): MenuItem {
  return {
    key,
    icon,
    label,
    className,
    id: key,
  } as MenuItem;
}

const TripTabs: React.FC<ITripTabsProps> = (props: ITripTabsProps) => {
  const navigator = useNavigate();
  const location = useLocation();

  const currentTab = useMemo(() => location.pathname.substring(location.pathname.lastIndexOf('/') + 1), [location.pathname]);

  const handleMenuSelect: MenuProps['onClick'] = (e) => {
    if (e.key === 'calendar') {
      const button = document.getElementById(e.key);
      if (button) {
        atcb_action({ name: props.trip.label, startDate: props.trip.dateFrom, endDate: props.trip.dateTo, options: ['Apple', 'Google', 'Yahoo', 'iCal'], timeZone: 'America/Los_Angeles', listStyle: 'modal' }, button);
      }
    } else {
      navigator(e.key);
    }
  };

  const items: MenuProps['items'] = [
    getItem(props.translate('TRIP_TABS.WEATHER'), 'weather', <CloudOutlined />),
    getItem(props.translate('TRIP_TABS.ITINERARY'), 'itinerary', <ScheduleOutlined />),
    getItem(props.translate('TRIP_TABS.PACKING_LIST'), 'packinglist', <UnorderedListOutlined />),
    getItem(props.translate('TRIP_TABS.EDIT'), 'edit', <SettingOutlined />),
    getItem(props.translate('TRIP_TABS.CALENDAR'), 'calendar', <CalendarOutlined />),
  ];

  return <Menu className="margin-bottom-lg" onClick={handleMenuSelect} mode="horizontal" selectedKeys={[currentTab]} items={items} />;
};

export default withLocalize<ITripTabsOwnProps>(TripTabs as any);
