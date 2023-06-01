import { Button, Col, Dropdown, MenuProps, Row, Select } from "antd";
import Avatar from "antd/es/avatar/avatar";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import logo from "../../asset/img/logo.png";
import { ITrip } from "../../model/trip/Trip";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IUserCredentials } from "../../model/user/User";

export interface IHomeLayoutViewHeaderOwnProps {
  userTrips: ITrip[];
  selectedTrip: ITrip;
  isUserLoggedIn: boolean;
  user: IUserCredentials;
  onTripSelect: (selectedTrip: number) => void;
  logout: () => void;
  openTripCreateModal: () => void;
}

type IHomeLayoutViewHeaderProps = IHomeLayoutViewHeaderOwnProps;

const HomeLayoutViewHeader: React.FC<IHomeLayoutViewHeaderProps> = (
  props: IHomeLayoutViewHeaderProps
) => {
  const navigate = useNavigate();
  const [selectedTripId, setSelectedTripId] = useState<number>(
    props.selectedTrip?.id
  );

  useEffect(() => {
    if (
      props.userTrips?.some((trip: ITrip) => trip.id === props.selectedTrip?.id)
    )
      setSelectedTripId(props.selectedTrip?.id);
  }, [props.selectedTrip, props.userTrips]);

  const handleTripSelect = useCallback((selectedTripId: number) => {
    setSelectedTripId(selectedTripId);
    props.onTripSelect(selectedTripId);
  }, []);

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
      <Col span={3} className="homeLayoutViewHeader__logo">
        <Avatar src={logo} className="margin-right-sm" />
        forget-me-not
      </Col>
      <Col offset={1} span={4}>
        <Select
          className="fullWidth"
          onChange={handleTripSelect}
          value={selectedTripId}
          options={props.userTrips?.map((trip: ITrip) => {
            return {
              value: trip.id,
              label: trip.name,
            };
          })}
        />
      </Col>

      <Col span={1}>
        <Button type="primary" onClick={props.openTripCreateModal}>
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
