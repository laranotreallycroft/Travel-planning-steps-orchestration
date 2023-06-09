import {
  Accessible,
  DirectionsBike,
  DirectionsCar,
  DirectionsWalk,
  Hiking,
} from "@mui/icons-material";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import { Button, Col, Form, Row, Select, Switch } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const vehicleProfiles = [
  {
    label: (
      <Row>
        <DirectionsCar className="margin-right-sm" />
        Car
      </Row>
    ),
    value: "driving-car",
  },
  {
    label: (
      <Row>
        <DirectionsBike className="margin-right-sm" />
        Bicycle
      </Row>
    ),
    value: "cycling-regular",
  },
  {
    label: (
      <Row>
        <SportsMotorsportsIcon className="margin-right-sm" />
        Mountain bicycle
      </Row>
    ),
    value: "cycling-mountain",
  },
  {
    label: (
      <Row>
        <DirectionsWalk className="margin-right-sm" />
        Walking
      </Row>
    ),
    value: "foot-walking",
  },
  {
    label: (
      <Row>
        <Hiking className="margin-right-sm" />
        Hiking
      </Row>
    ),
    value: "foot-hiking",
  },
  {
    label: (
      <Row>
        <Accessible className="margin-right-sm" />
        Wheelchair
      </Row>
    ),
    value: "wheelchair",
  },
];
export interface IItinerarySettingsViewOwnProps {
  onNextStep: () => void;
  onPreviousStep: () => void;
}

type IItinerarySettingsViewProps = IItinerarySettingsViewOwnProps;

const ItinerarySettingsView: React.FC<IItinerarySettingsViewProps> = (
  props: IItinerarySettingsViewProps
) => {
  return (
    <Row justify={"space-between"} className="fullHeight">
      <Row className="margin-bottom-l fullWidth">
        <Col span={5}>
          <Title level={5}>Route options</Title>
          <Form.Item
            label={"Optimize route"}
            name={["routeOptions", "optimize"]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Row className="fullWidth">
            <Form.Item
              name={["routeOptions", "vehicleProfile"]}
              className="fullWidth"
            >
              <Select options={vehicleProfiles} />
            </Form.Item>
          </Row>
        </Col>
      </Row>
      <Row
        justify={"space-between"}
        align={"bottom"}
        className="fullWidth margin-bottom-l"
      >
        <Button type="primary" onClick={props.onPreviousStep}>
          Back
        </Button>
        <Button type="primary" onClick={props.onNextStep}>
          Submit
        </Button>
      </Row>
    </Row>
  );
};

export default ItinerarySettingsView;
