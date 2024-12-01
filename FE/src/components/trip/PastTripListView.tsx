import { Col, Row } from 'antd';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import TripCard from 'components/trip/TripCard';
import TripListEmpty from 'components/trip/TripListEmpty';
import { ITrip } from 'model/trip/Trip';
import React from 'react';

export interface IPastTripListViewOwnProps {
  tripList: ITrip[];
}

type IPastTripListViewProps = IPastTripListViewOwnProps & IWithLocalizeOwnProps;

const PastTripListView: React.FC<IPastTripListViewProps> = (props: IPastTripListViewProps) => {
  return (
    <React.Fragment>
      {props.tripList?.length > 0 ? (
        <Row gutter={[4, 4]}>
          {props.tripList.map((trip) => (
            <Col sm={24} md={12}>
              <TripCard trip={trip} />
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