import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Form, List, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useEffect, useState } from "react";
import { ISightseeingRoutePayload } from "../../../model/trip/sightseeing/Sightseeing";
import MapElement, { IGeosearchPayload } from "../../common/map/MapElement";
import MapSearch from "../../common/map/MapSearch";

export interface ISightseeingStopsSelectViewOwnProps {
  selectedLocation: IGeosearchPayload;
  onSightseeingStopsSelect: (value: ISightseeingRoutePayload) => void;
}

type ISightseeingStopsSelectViewProps = ISightseeingStopsSelectViewOwnProps;

const SightseeingStopsSelectView: React.FC<ISightseeingStopsSelectViewProps> = (
  props: ISightseeingStopsSelectViewProps
) => {
  const [selectedLocation, setSelectedLocation] = useState<IGeosearchPayload>(
    props.selectedLocation
  );
  const [locations, setLocations] = useState<IGeosearchPayload[]>(
    props.selectedLocation ? [props.selectedLocation] : []
  );

  const handleSelectLocation = useCallback(
    (value: string) => {
      const parsedValue: IGeosearchPayload = JSON.parse(value);
      setSelectedLocation(parsedValue);
      setLocations([...locations, parsedValue]);
    },
    [locations]
  );

  const handleRemoveLocation = useCallback(
    (e: any, value: IGeosearchPayload) => {
      e.stopPropagation();
      e.preventDefault();
      const newLocations = locations.filter((location) => location !== value);
      setLocations(newLocations);
      setSelectedLocation(newLocations[0]);
    },
    [locations]
  );

  const handleNext = () => {
    props.onSightseeingStopsSelect({ locations });
  };

  return (
    <div className="fullSize">
      <Row className="margin-bottom-l">
        <Title level={4}>Select your stops</Title>
      </Row>
      <Row gutter={[16, 16]} className="margin-bottom-l">
        <Col span={8}>
          <Row className="margin-bottom-l">
            <MapSearch onSelectLocation={handleSelectLocation} />
          </Row>
          <Row>
            <List
              className="fullWidth sightseeingStopsSelectView__locationList"
              bordered
              dataSource={locations}
              renderItem={(location) => (
                <List.Item
                  onClick={() => setSelectedLocation(location)}
                  className="sightseeingStopsSelectView__listItem"
                >
                  <Row justify="space-between" className="fullWidth">
                    <Col span={22}> {location.label}</Col>

                    <Button
                      icon={<DeleteOutlined />}
                      onClick={(e) => handleRemoveLocation(e, location)}
                      size="small"
                      className="customDropdownInput__deleteButton"
                    />
                  </Row>
                </List.Item>
              )}
            />
          </Row>
        </Col>
        <Col span={16}>
          <MapElement
            selectedLocation={selectedLocation}
            locations={locations}
            className="sightseeingStopsSelectView__mapContainer"
          />
        </Col>
      </Row>

      <Button type="primary" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default SightseeingStopsSelectView;
