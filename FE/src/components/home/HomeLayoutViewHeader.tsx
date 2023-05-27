import { Col, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback } from "react";
import { ITrip } from "../../model/trip/Trip";

const SUBMENU_OPTIONS = [{ label: "Trip Reminders", value: "Reminders" }];
export interface IHomeLayoutViewHeaderOwnProps {
  userTrips: ITrip[];
  selectedTrip: ITrip;
  onTripSelect: (selectedTrip: number) => void;
  onTripUpdate: (trip: ITrip) => void;
}

type IHomeLayoutViewHeaderProps = IHomeLayoutViewHeaderOwnProps;

const HomeLayoutViewHeader: React.FC<IHomeLayoutViewHeaderProps> = (
  props: IHomeLayoutViewHeaderProps
) => {
  const handleTripNameChange = useCallback(
    (newName: string) => {
      props.onTripUpdate({ ...props.selectedTrip, name: newName });
    },
    [props.selectedTrip]
  );

  const handleSubmenuChange = (submenu: string) => {
    console.log(submenu);
  };

  return (
    <Row align={"middle"}>
      <Col span={8}>
        <Select
          className="homeLayoutViewHeader__selectTrip"
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
      <Col span={8}>
        <Select
          className="homeLayoutViewHeader__selectTrip"
          onChange={handleSubmenuChange}
          defaultValue={SUBMENU_OPTIONS[0].value}
          options={SUBMENU_OPTIONS}
        />
      </Col>
      <Title
        className="title homeLayoutViewHeader__tripTitle"
        editable={{
          onChange: handleTripNameChange,
          triggerType: ["text"],
          enterIcon: null,
        }}
      >
        {props.selectedTrip.name}
      </Title>
    </Row>
  );
};

export default HomeLayoutViewHeader;
