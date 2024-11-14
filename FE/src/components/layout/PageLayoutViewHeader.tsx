import { Menu, MenuProps } from "antd";
import logo from "asset/img/logo.png";
import withLocalize, {
  IWithLocalizeOwnProps,
} from "components/common/localize/withLocalize";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  className?: string,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
    className,
  } as MenuItem;
}

export interface IPageLayoutViewHeaderOwnProps {}

type IPageLayoutViewHeaderProps = IPageLayoutViewHeaderOwnProps &
  IWithLocalizeOwnProps;

const PageLayoutViewHeader: React.FC<IPageLayoutViewHeaderProps> = (
  props: IPageLayoutViewHeaderProps
) => {
  const navigator = useNavigate();
  const location = useLocation();

  const currentTab = useMemo(
    () => location.pathname.substring(location.pathname.indexOf("/")),
    [location.pathname]
  );

  const handleMenuSelect: MenuProps["onClick"] = (e) => {
    navigator(e.key);
  };

  const items: MenuProps["items"] = [
    getItem(props.translate("NAVIGATION.INFO"), "/info"),
    getItem(props.translate("NAVIGATION.LOGIN"), "/login"),
    getItem(props.translate("NAVIGATION.CREATE"), "/create"),
  ];

  return (
    <React.Fragment>
      <div className="pageLayoutViewHeader__imgContainer">
        <img src={logo} className="pageLayoutViewHeader__img" alt="" />
      </div>

      <div className="pageLayoutViewHeader__menuContainer">
        <Menu
          onClick={handleMenuSelect}
          selectedKeys={[currentTab]}
          items={items}
          mode="horizontal"
          disabledOverflow={true}
        />
      </div>
    </React.Fragment>
  );
};

export default withLocalize(PageLayoutViewHeader as any);
