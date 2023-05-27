import React, { useCallback } from "react";
import { ITrip } from "../../model/trip/Trip";
import { Row } from "antd";

export interface IHomeLayoutViewSiderOwnProps {
  selectedTrip: ITrip;
  onTripUpdate: (trip: ITrip) => void;
}

type IHomeLayoutViewSiderProps = IHomeLayoutViewSiderOwnProps;

const HomeLayoutViewSider: React.FC<IHomeLayoutViewSiderProps> = (
  props: IHomeLayoutViewSiderProps
) => {
  const handleTripNameChange = useCallback(
    (newName: string) => {
      props.onTripUpdate({ ...props.selectedTrip, name: newName });
    },
    [props.selectedTrip]
  );

  return (
    <div>
      <Row>Trip settings</Row>
    </div>
  );
};

export default HomeLayoutViewSider;
