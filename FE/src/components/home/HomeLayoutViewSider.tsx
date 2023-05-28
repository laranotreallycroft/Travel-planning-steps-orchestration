import { MailOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";

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
    "Reminders",
    "reminders",
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
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
      className="homeLayoutViewSider_menu"
    />
  );
};

export default HomeLayoutViewSider;
