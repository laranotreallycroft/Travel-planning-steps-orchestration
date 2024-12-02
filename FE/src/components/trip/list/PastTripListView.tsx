import { Col, Row } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import TripCard from 'components/trip/common/TripCard';
import TripListEmpty from 'components/trip/list/TripListEmpty';
import { ITrip } from 'model/trip/Trip';
import React from 'react';

export interface IPastTripListViewOwnProps {
  tripList: ITrip[];
}

type IPastTripListViewProps = IPastTripListViewOwnProps & IWithLocalizeOwnProps;

const PastTripListView: React.FC<IPastTripListViewProps> = (props: IPastTripListViewProps) => {
  return (
    <React.Fragment>
      {props.tripList.length > 0 ? (
        <Row gutter={[4, 4]}>
          {props.tripList.map((trip) => (
            <Col sm={24} md={12} className="fullWidth" key={trip.id}>
              <TripCard trip={trip} isClickable={true} />
            </Col>
          ))}
        </Row>
      ) : (
        <TripListEmpty />
      )}
    </React.Fragment>
  );
};

export default withLocalize<IPastTripListViewOwnProps>(PastTripListView as any);
