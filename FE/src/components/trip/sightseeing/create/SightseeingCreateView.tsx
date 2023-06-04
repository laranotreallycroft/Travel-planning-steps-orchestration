import { Col, Row, Steps } from "antd";
import { useMemo, useState } from "react";
import SightseeingStopsContainer from "./SightseeingStopsContainer";
import { ITrip } from "../../../../model/trip/Trip";

export interface ISightseeingCreateViewOwnProps {
  trip: ITrip;
}

type ISightseeingCreateViewProps = ISightseeingCreateViewOwnProps;

const SightseeingCreateView: React.FC<ISightseeingCreateViewProps> = (
  props: ISightseeingCreateViewProps
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
        content: <SightseeingStopsContainer onNextStep={handleNextStep} />,
      },
      {
        title: "Select your stops",
        content: <SightseeingStopsContainer onNextStep={handleNextStep} />,
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

export default SightseeingCreateView;
