import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Button, Col, Form, Row, Switch } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
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
        <Col>
          <Title level={5}>Route options</Title>
          <Form.Item
            label={"Optimize route"}
            name={["routeOptions", "optimize"]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Row>
            <DirectionsWalkIcon />
            <Form.Item
              name={["routeOptions", "carTravel"]}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <DirectionsCarIcon />
          </Row>
        </Col>
      </Row>
      <Row justify={"space-between"} align={"bottom"} className="fullWidth">
        <Button type="primary" onClick={props.onPreviousStep}>
          Back
        </Button>
        <Button type="primary" onClick={props.onNextStep}>
          Create
        </Button>
      </Row>
    </Row>
  );
};

export default ItinerarySettingsView;
