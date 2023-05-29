import { MailOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface IHomeLayoutViewSiderOwnProps {}

type IHomeLayoutViewSiderProps = IHomeLayoutViewSiderOwnProps;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,

  className?: string
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
    <MailOutlined />,
    "homeLayoutViewSider_menuItem"
  ),
  getItem(
    "General information",
    "general",
    <MailOutlined />,
    "homeLayoutViewSider_menuItem"
  ),
];

const HomeLayoutViewSider: React.FC<IHomeLayoutViewSiderProps> = (
  props: IHomeLayoutViewSiderProps
) => {
  const navigator = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigator(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["packinglist"]}
      mode="inline"
      items={items}
      className="homeLayoutViewSider_menu"
    />
  );
};

export default HomeLayoutViewSider;
