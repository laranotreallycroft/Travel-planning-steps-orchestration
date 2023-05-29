import { Button, Col, Dropdown, MenuProps, Row, Select } from "antd";
import Avatar from "antd/es/avatar/avatar";
import React from "react";
import logo from "../../asset/img/logo.png";
import { ITrip } from "../../model/trip/Trip";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IUserCredentials } from "../../model/user/User";

export interface IHomeLayoutViewHeaderOwnProps {
  userTrips: ITrip[];
  selectedTrip: ITrip;
  isUserLoggedIn: boolean;
  currentUser: IUserCredentials;
  onTripSelect: (selectedTrip: number) => void;
  logout: () => void;
  openCreateTripModal: () => void;
}

type IHomeLayoutViewHeaderProps = IHomeLayoutViewHeaderOwnProps;

const HomeLayoutViewHeader: React.FC<IHomeLayoutViewHeaderProps> = (
  props: IHomeLayoutViewHeaderProps
) => {
  const navigate = useNavigate();
  const loggedInUserProfileItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Logout",
      onClick: props.logout,
    },
  ];
  const loggedOutUserProfileItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Login",
      onClick: () => navigate("/login"),
    },
  ];
  const userProfileItems: MenuProps["items"] = props.isUserLoggedIn
    ? loggedInUserProfileItems
    : loggedOutUserProfileItems;

  return (
    <Row align={"middle"} gutter={[16, 16]}>
      <Col span={3} className="homeLayoutViewHeader__logo">
        <Avatar src={logo} className="margin-right-sm" />
        forget-me-not
      </Col>
      <Col offset={1} span={4}>
        <Select
          className="fullWidth"
          onChange={props.onTripSelect}
          defaultValue={props.selectedTrip.id}
          options={props.userTrips.map((trip: ITrip) => {
            return {
              value: trip.id,
              label: trip.name,
            };
          })}
        />
      </Col>

      <Col span={1}>
        <Button type="primary" onClick={props.openCreateTripModal}>
          Create
        </Button>
      </Col>

      <Col offset={13}>
        <Dropdown
          menu={{ items: userProfileItems }}
          trigger={["click"]}
          placement="bottomRight"
          arrow
          className="homeLayoutViewHeader__dropdown"
        >
          <div onClick={(e) => e.preventDefault()}>
            <Avatar
              shape="square"
              size="large"
              icon={<UserOutlined />}
              className="margin-right-sm"
            />
            <DownOutlined />
          </div>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default HomeLayoutViewHeader;
