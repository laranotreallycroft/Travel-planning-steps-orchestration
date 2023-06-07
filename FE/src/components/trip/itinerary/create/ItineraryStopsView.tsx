import { DeleteOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IItineraryPayload } from "../../../../service/business/itinerary/ItineraryBusinessStore";
import notificationService from "../../../../service/util/notificationService";
import DragAndDropTable from "../../../common/list/DragAndDropTable";
import MapElement, {
  IGeosearchPayloadWithId,
} from "../../../common/map/MapElement";
import MapSearch from "../../../common/map/MapSearch";
export interface IItineraryStopsViewOwnProps {
  onNextStep: () => void;
}

type IItineraryStopsViewProps = IItineraryStopsViewOwnProps;

const ItineraryStopsView: React.FC<IItineraryStopsViewProps> = (
  props: IItineraryStopsViewProps
) => {
  const form = Form.useFormInstance<IItineraryPayload>();
  const locations = Form.useWatch("locations", form);
  const [selectedLocation, setSelectedLocation] =
    useState<IGeosearchPayloadWithId>(form.getFieldValue("locations")[0]);
  const setLocations = useCallback((locations: IGeosearchPayloadWithId[]) => {
    form.setFieldValue("locations", locations);
  }, []);

  const handleAddLocation = useCallback(
    (value: string) => {
      const parsedValue: IGeosearchPayloadWithId = {
        ...JSON.parse(value),
        id: uuidv4(),
      };
      setSelectedLocation(parsedValue);
      setLocations([...locations, parsedValue]);
    },
    [locations]
  );

  const handleRemoveLocation = useCallback(
    (e: any, value: IGeosearchPayloadWithId) => {
      e.stopPropagation();
      e.preventDefault();
      const newLocations = locations.filter(
        (location) => location.id !== value.id
      );
      setSelectedLocation(newLocations[0]);
      setLocations(newLocations);
    },
    [locations]
  );

  const handleNext = () => {
    if (locations.length >= 2) props.onNextStep();
    else
      notificationService.error(
        "Unable to generate route",
        "Please select at least two stops"
      );
  };
  return (
    <Row justify={"space-between"} className="fullHeight">
      <Row className="fullWidth">
        <Row className="margin-bottom-l">
          <Title level={4}>Select your stops</Title>
        </Row>
        <Row gutter={[16, 16]} className="margin-bottom-l fullWidth">
          <Col span={8}>
            <Row className="margin-bottom-l">
              <MapSearch onSelectLocation={handleAddLocation} />
            </Row>
            <Row className="itineraryStopsView__listcontainer">
              <Form.List name="locations">
                {() => (
                  <DragAndDropTable
                    sortableContextItems={
                      locations
                        ? locations.map((location) => location.id)
                        : form
                            .getFieldValue("locations")
                            .map(
                              (location: IGeosearchPayloadWithId) => location.id
                            )
                    }
                    tableDataSource={
                      locations
                        ? locations.map((location) => {
                            return { ...location, key: location.id };
                          })
                        : form
                            .getFieldValue("locations")
                            .map((location: IGeosearchPayloadWithId) => {
                              return { ...location, key: location.id };
                            })
                    }
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
                                onClick={(e) =>
                                  handleRemoveLocation(e, location)
                                }
                                size="small"
                              />
                            </Tooltip>
                            <Tooltip
                              placement="bottom"
                              title={"Zoom to location"}
                            >
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
                    className="fullSize"
                  />
                )}
              </Form.List>
            </Row>
          </Col>
          <Col span={16}>
            <MapElement
              selectedLocation={selectedLocation}
              locations={locations}
              className="fullHeight"
            />
          </Col>
        </Row>
      </Row>
      <Row justify={"end"} align={"bottom"} className="fullWidth">
        <Button type="primary" onClick={handleNext}>
          Next
        </Button>
      </Row>
    </Row>
  );
};

export default ItineraryStopsView;
