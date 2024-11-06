import { DeleteOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Button, Col, Form, Radio, Row, Select, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import notificationService from "service/util/notificationService";
import DragAndDropTable from "components/common/list/DragAndDropTable";
import MapElement, {
  IGeosearchPayloadWithId,
} from "components/common/map/MapElement";
import MapSearch from "components/common/map/MapSearch";
import { ITrip } from "model/trip/Trip";
import {
  IItineraryForm,
  IItineraryElementPayload,
} from "service/business/trip/itinerary/ItineraryBusinessStore";
import {
  DirectionsCar,
  DirectionsBike,
  DirectionsWalk,
  Hiking,
  Accessible,
} from "@mui/icons-material";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
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

export interface IItineraryStopsViewOwnProps {
  trip: ITrip;
  onNextStep: () => void;
}

type IItineraryStopsViewProps = IItineraryStopsViewOwnProps;

const ItineraryStopsView: React.FC<IItineraryStopsViewProps> = (
  props: IItineraryStopsViewProps
) => {
  const form = Form.useFormInstance<IItineraryForm>();
  const locations = Form.useWatch("locations", form);
  const [selectedLocation, setSelectedLocation] =
    useState<IItineraryElementPayload>(form.getFieldValue("locations")[0]);
  const setLocations = useCallback((locations: IItineraryElementPayload[]) => {
    form.setFieldValue("locations", locations);
  }, []);

  const handleAddLocation = useCallback(
    (value: string) => {
      const parsedValue: IItineraryElementPayload = {
        ...JSON.parse(value),
        id: uuidv4(),
        duration: 60,
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
    if (locations.length === 0)
      notificationService.error(
        "Unable to generate route",
        "Please select at least one stop"
      );
    else if (
      locations.every((element) => {
        return (
          element.x === props.trip.location.x &&
          element.y === props.trip.location.y
        );
      })
    )
      notificationService.error(
        "Unable to generate route",
        "All stops are the same as trip origin"
      );
    else props.onNextStep();
  };
  return (
    <React.Fragment>
      <Row>
        <Title level={4}>Select your stops</Title>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <MapSearch onSelectLocation={handleAddLocation} />
        </Col>
        <Col span={8}>
          <Form.Item name={["routeOptions", "optimize"]}>
            <Radio.Group>
              <Radio.Button value={false}>
                Keep original route order
              </Radio.Button>
              <Radio.Button value={true}>Optimize route</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            name={["routeOptions", "vehicleProfile"]}
            className="fullWidth"
          >
            <Select options={vehicleProfiles} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} className="itineraryStopsView__container">
        <Col span={12} className="fullHeight">
          <Form.List name="locations">
            {() => (
              <DragAndDropTable
                sortableContextItems={
                  locations
                    ? locations.map((location) => location.id)
                    : form
                        .getFieldValue("locations")
                        .map((location: IGeosearchPayloadWithId) => location.id)
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
                    width: 100,
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
              />
            )}
          </Form.List>
        </Col>
        <Col span={12}>
          <MapElement
            selectedLocation={selectedLocation}
            locations={[locations]}
            className="fullHeight"
          />
        </Col>
      </Row>

      <Row justify={"end"} align={"bottom"} className="margin-top-md">
        <Button type="primary" onClick={handleNext}>
          Next
        </Button>
      </Row>
    </React.Fragment>
  );
};

export default ItineraryStopsView;
