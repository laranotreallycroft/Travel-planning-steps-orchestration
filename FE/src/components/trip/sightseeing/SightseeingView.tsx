import { Badge, Button, Calendar, Col, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useState } from "react";
import { ITrip } from "../../../model/trip/Trip";
import { ISightseeing } from "../../../model/trip/sightseeing/Sightseeing";
import SightseeingCreateContainer from "./create/SightseeingCreateContainer";

export interface ISightseeingViewOwnProps {
  trip: ITrip;
  sightseeingList: ISightseeing[];
}

type ISightseeingViewProps = ISightseeingViewOwnProps;
const SightseeingView: React.FC<ISightseeingViewProps> = (
  props: ISightseeingViewProps
) => {
  const [selectedDate, setselectedDate] = useState<Dayjs>(
    dayjs(props.trip.dateFrom)
  );

  const [isSightseeingCreateModalOpen, setIsSightseeingCreateModalOpen] =
    useState<boolean>(false);

  const toggleSightseeingCreateModal = useCallback(() => {
    setIsSightseeingCreateModalOpen((prevState) => !prevState);
  }, []);

  const dateCellRender = (value: Dayjs) => {
    //TODO add badge on each sightseeing on calendar
    return <Badge key={1} status={"success"} />;
  };

  return (
    <div className="fullHeight">
      <Row gutter={[16, 16]}>
        <Col span={6} className="panel">
          <Calendar
            fullscreen={false}
            cellRender={dateCellRender}
            onSelect={setselectedDate}
          />
        </Col>
        <Col span={17} className="panel">
          <Button type="primary" onClick={toggleSightseeingCreateModal}>
            Create new
          </Button>
        </Col>
      </Row>

      <SightseeingCreateContainer
        onSightseeingCreateModalClose={toggleSightseeingCreateModal}
        isSightseeingCreateModalOpen={isSightseeingCreateModalOpen}
        date={selectedDate.format("YYYY-MM-DD")}
      />
    </div>
  );
};

export default SightseeingView;
