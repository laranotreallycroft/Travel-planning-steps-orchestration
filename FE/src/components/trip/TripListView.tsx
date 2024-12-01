import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import TripCard from 'components/trip/TripCard';
import TripListEmpty from 'components/trip/TripListEmpty';
import { ITrip } from 'model/trip/Trip';
import React from 'react';

export interface ITripListViewOwnProps {
  tripList: ITrip[];
  onTripCreateModalOpen: () => void;
}

type ITripListViewProps = ITripListViewOwnProps & IWithLocalizeOwnProps;

const TripListView: React.FC<ITripListViewProps> = (props: ITripListViewProps) => {
  return (
    <React.Fragment>
      {props.tripList?.length > 0 ? (
        <React.Fragment>
          <Row className="margin-md">
            <Col>
              <Button type="primary" onClick={props.onTripCreateModalOpen} icon={<PlusOutlined />}>
                {props.translate('TRIP_LIST_VIEW.CREATE_TRIP_BUTTON')}
              </Button>
            </Col>
          </Row>

          <Row gutter={[4, 4]}>
            {props.tripList.map((trip) => (
              <Col sm={24} md={12}>
                <TripCard trip={trip} />
              </Col>
            ))}
          </Row>
        </React.Fragment>
      ) : (
        <TripListEmpty onTripCreateModalOpen={props.onTripCreateModalOpen} />
      )}
    </React.Fragment>
  );
};

export default withLocalize<ITripListViewOwnProps>(TripListView as any);
