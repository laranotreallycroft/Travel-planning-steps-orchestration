import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import TripCard from 'components/trip/common/TripCard';
import TripListEmpty from 'components/trip/list/TripListEmpty';
import { ITrip } from 'model/trip/Trip';
import React from 'react';

export interface ITripListViewOwnProps {
  tripList: ITrip[];
  canCreateTrip?: boolean;
  onTripCreateModalOpen?: () => void;
}

type ITripListViewProps = ITripListViewOwnProps & IWithLocalizeOwnProps;

const TripListView: React.FC<ITripListViewProps> = (props: ITripListViewProps) => {
  return (
    <React.Fragment>
      {props.tripList.length > 0 ? (
        <React.Fragment>
          {props.canCreateTrip && (
            <Row className="margin-md">
              <Col>
                <Button type="primary" onClick={props.onTripCreateModalOpen} icon={<PlusOutlined />}>
                  {props.translate('TRIP_LIST_VIEW.CREATE_TRIP_BUTTON')}
                </Button>
              </Col>
            </Row>
          )}

          <Row gutter={[4, 4]}>
            {props.tripList.map((trip) => (
              <Col sm={24} md={12} key={trip.id} className="fullWidth">
                <TripCard trip={trip} isClickable={true} />
              </Col>
            ))}
          </Row>
        </React.Fragment>
      ) : (
        <TripListEmpty isUpcomingTrips={props.canCreateTrip} onTripCreateModalOpen={props.onTripCreateModalOpen} />
      )}
    </React.Fragment>
  );
};

export default withLocalize<ITripListViewOwnProps>(TripListView as any);
