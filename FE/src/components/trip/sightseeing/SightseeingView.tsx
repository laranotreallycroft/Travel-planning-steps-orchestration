import { Col, Row, Steps } from "antd";
import { useMemo, useState } from "react";
import { ITrip } from "../../../model/trip/Trip";
import SightseeingStopsSelectContainer from "./SightseeingStopsSelectContainer";

export interface ISightseeingViewOwnProps {
  trip: ITrip;
}

type ISightseeingViewProps = ISightseeingViewOwnProps;

const SightseeingView: React.FC<ISightseeingViewProps> = (
  props: ISightseeingViewProps
) => {
  const [current, setCurrent] = useState(0);
  const handleNextStep = () => {
    setCurrent(current + 1);
  };

  const handlePrevStep = () => {
    setCurrent(current - 1);
  };

  const steps = useMemo(
    () => [
      {
        title: "Select your stops",
        content: (
          <SightseeingStopsSelectContainer onNextStep={handleNextStep} />
        ),
      },
      {
        title: "Second",
        content: "Second-content",
      },
      {
        title: "Last",
        content: "Last-content",
      },
    ],
    []
  );

  const items = useMemo(
    () => steps.map((item) => ({ key: item.title, title: item.title })),
    [steps]
  );
  return (
    <>
      <Steps current={current} items={items} />

      <Row justify={"end"} className="fullHeight">
        <Col span={24}>{steps[current].content}</Col>
      </Row>
    </>
  );
};

export default SightseeingView;
