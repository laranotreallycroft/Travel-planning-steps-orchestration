import { Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import { ITrip } from "../../model/trip/Trip";

export interface IHomeViewOwnProps {
  userTrips: ITrip[];
  onTripSelect: (selectedTrip: ITrip) => void;
}

type IHomeViewProps = IHomeViewOwnProps;

const HomeView: React.FC<IHomeViewProps> = (props: IHomeViewProps) => {
  return (
    <div className="createTripView__backgroundImage">
      <Row justify={"center"}>
        <Title className="title">Your travel plans</Title>
      </Row>
      <Select
        className="homeView__selectTrip"
        defaultValue={props.userTrips[0]}
        onChange={props.onTripSelect}
        options={props.userTrips.map((trip: ITrip) => {
          return {
            value: trip.id,
            label: trip.dateFrom + " <-> " + trip.dateTo,
          };
        })}
      />
    </div>
  );
};

export default HomeView;
