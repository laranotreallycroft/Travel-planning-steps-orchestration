import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import TripCard from 'components/trip/TripCard';
import TripListEmpty from 'components/trip/TripListEmpty';
import { ITrip } from 'model/trip/Trip';
import React from 'react';

export interface IUpcomingTripListViewOwnProps {
  tripList: ITrip[];
  onTripCreateModalOpen: () => void;
}

type IUpcomingTripListViewProps = IUpcomingTripListViewOwnProps & IWithLocalizeOwnProps;

const UpcomingTripListView: React.FC<IUpcomingTripListViewProps> = (props: IUpcomingTripListViewProps) => {
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
                <TripCard trip={trip} isClickable={true} />
              </Col>
            ))}
          </Row>
        </React.Fragment>
      ) : (
        <TripListEmpty isUpcomingTrips={true} onTripCreateModalOpen={props.onTripCreateModalOpen} />
      )}
    </React.Fragment>
  );
};

export default withLocalize<IUpcomingTripListViewOwnProps>(UpcomingTripListView as any);
