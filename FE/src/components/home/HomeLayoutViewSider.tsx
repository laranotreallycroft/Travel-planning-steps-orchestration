import {
  CloudOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Menu, MenuProps } from "antd";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface IHomeLayoutViewSiderOwnProps {}

type IHomeLayoutViewSiderProps = IHomeLayoutViewSiderOwnProps;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon: React.ReactNode,
  className: string
): MenuItem {
  return {
    key,
    icon,
    label,
    className,
  } as MenuItem;
}
const items: MenuProps["items"] = [
  getItem(
    "Packing list",
    "packinglist",
    <UnorderedListOutlined />,
    "homeLayoutViewSider_menuItem"
  ),
  getItem(
    "Weather",
    "weather",
    <CloudOutlined />,
    "homeLayoutViewSider_menuItem"
  ),
  getItem(
    "Sightseeing",
    "sightseeing",
    <MapOutlinedIcon />,
    "homeLayoutViewSider_menuItem"
  ),
  getItem(
    "Settings",
    "settings",
    <SettingOutlined />,
    "homeLayoutViewSider_menuItem"
  ),
];

const HomeLayoutViewSider: React.FC<IHomeLayoutViewSiderProps> = (
  props: IHomeLayoutViewSiderProps
) => {
  const navigator = useNavigate();
  const location = useLocation();

  const currentTab = useMemo(
    () => location.pathname.substring(location.pathname.lastIndexOf("/") + 1),
    [location.pathname]
  );

  const handleMenuSelect: MenuProps["onClick"] = (e) => {
    navigator(e.key);
  };

  return (
    <Menu
      onClick={handleMenuSelect}
      style={{ width: 256 }}
      selectedKeys={[currentTab]}
      mode="inline"
      items={items}
      className="homeLayoutViewSider_menu"
    />
  );
};

export default HomeLayoutViewSider;
