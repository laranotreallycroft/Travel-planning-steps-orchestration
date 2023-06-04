import { Badge, Calendar, Col, Row } from "antd";
import { Dayjs } from "dayjs";
import React, { useState } from "react";
import { ISightseeing } from "../../../model/trip/sightseeing/Sightseeing";

export interface ISightseeingViewOwnProps {
  sightseeingList: ISightseeing[];
}

type ISightseeingViewProps = ISightseeingViewOwnProps;
const SightseeingView: React.FC<ISightseeingViewProps> = (
  props: ISightseeingViewProps
) => {
  const [selectedDate, setselectedDate] = useState<Dayjs>();

  const handleCreatePlan = () => {
    console.log(selectedDate);
  };

  const dateCellRender = (value: Dayjs) => {
    return <Badge key={1} status={"success"} />;
  };

  return (
    <div className="fullHeight">
      <Row>
        <Col span={6}>
          <Calendar
            fullscreen={false}
            cellRender={dateCellRender}
            onSelect={setselectedDate}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SightseeingView;
