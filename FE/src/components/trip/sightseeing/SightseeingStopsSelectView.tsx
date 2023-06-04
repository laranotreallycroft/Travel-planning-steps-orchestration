import { Button, Col, Row, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useEffect, useState } from "react";
import DragAndDropTable from "../../common/list/DragAndDropTable";
import notificationService from "../../../service/util/notificationService";
import MapElement, { IGeosearchPayload } from "../../common/map/MapElement";
import MapSearch from "../../common/map/MapSearch";
import { DeleteOutlined, ZoomInOutlined } from "@ant-design/icons";

export interface ISightseeingStopsSelectViewOwnProps {
  originLocation: IGeosearchPayload;
  onSightseeingStopsSelect: (value: IGeosearchPayload[]) => void;
}

type ISightseeingStopsSelectViewProps = ISightseeingStopsSelectViewOwnProps;

const SightseeingStopsSelectView: React.FC<ISightseeingStopsSelectViewProps> = (
  props: ISightseeingStopsSelectViewProps
) => {
  const [selectedLocation, setSelectedLocation] = useState<IGeosearchPayload>(
    props.originLocation
  );
  const [locations, setLocations] = useState<IGeosearchPayload[]>(
    props.originLocation ? [props.originLocation] : []
  );

  useEffect(() => {
    setSelectedLocation(props.originLocation);
    setLocations([props.originLocation]);
  }, [props.originLocation]);

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
      const newLocations = locations.filter(
        (location) => location.label !== value.label
      );
      setLocations(newLocations);
      setSelectedLocation(newLocations[0]);
    },
    [locations]
  );

  const handleNext = () => {
    if (locations.length >= 2) props.onSightseeingStopsSelect(locations);
    else
      notificationService.error(
        "Unable to generate route",
        "Please select at least two stops"
      );
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
            <DragAndDropTable
              sortableContextItems={locations.map((location) => location.label)}
              tableDataSource={locations.map((location) => {
                return { ...location, key: location.label };
              })}
              tableColumns={[
                {
                  title: "Location",
                  dataIndex: "label",
                },
                {
                  title: "Action",
                  key: "action",
                  render: (_, location) => (
                    <Row justify={"space-between"}>
                      <Tooltip placement="bottom" title={"Remove stop"}>
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={(e) => handleRemoveLocation(e, location)}
                          size="small"
                        />
                      </Tooltip>
                      <Tooltip placement="bottom" title={"Zoom to location"}>
                        <Button
                          icon={<ZoomInOutlined />}
                          onClick={() => setSelectedLocation(location)}
                          size="small"
                        />
                      </Tooltip>
                    </Row>
                  ),
                },
              ]}
              setLocations={setLocations}
              className="sightseeingStopsSelectView__locationList"
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
