import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, MenuProps, Row, Select } from "antd";
import Avatar from "antd/es/avatar/avatar";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../asset/img/logo.png";
import { ITrip } from "../../model/trip/Trip";

export interface IHomeLayoutViewHeaderOwnProps {
  userTrips: ITrip[];
  trip: ITrip;
  isUserLoggedIn: boolean;
  onTripSelect: (selectedTripId: number) => void;
  logout: () => void;
  openTripCreateModal: () => void;
}

type IHomeLayoutViewHeaderProps = IHomeLayoutViewHeaderOwnProps;

const HomeLayoutViewHeader: React.FC<IHomeLayoutViewHeaderProps> = (
  props: IHomeLayoutViewHeaderProps
) => {
  const navigate = useNavigate();

  const userProfileItems: MenuProps["items"] = useMemo(
    () =>
      props.isUserLoggedIn
        ? [
            {
              key: "1",
              label: "Logout",
              onClick: props.logout,
            },
          ]
        : [
            {
              key: "1",
              label: "Login",
              onClick: () => navigate("/login"),
            },
          ],
    [props.isUserLoggedIn]
  );
  return (
    <Row align={"middle"} gutter={[16, 16]}>
      <Col xs={0} sm={10} md={6} lg={6} xl={4}>
        <Avatar src={logo} shape="square" className="fullSize" />
      </Col>
      <Col xs={12} sm={8} md={8} lg={8} xl={5}>
        <Select
          className="fullWidth"
          onChange={props.onTripSelect}
          value={props.trip?.id}
          options={props.userTrips?.map((trip: ITrip) => {
            return {
              value: trip.id,
              label: trip.name,
            };
          })}
        />
      </Col>

      <Col xs={2} sm={2} md={2} lg={2} xl={2}>
        <Button type="primary" onClick={props.openTripCreateModal}>
          Create
        </Button>
      </Col>

      <Col
        xs={10}
        sm={4}
        md={8}
        lg={8}
        xl={13}
        className="homeLayoutViewHeader__dropdownCol"
      >
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
