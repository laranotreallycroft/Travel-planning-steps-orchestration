import { ITrip } from 'model/trip/Trip';
import React from 'react';
import noUpcomingImage from 'asset/img/no_upcoming.svg';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { Button, Col, Row, Typography } from 'antd';

export interface ITripListViewOwnProps {
  tripList: ITrip[];
  onTripCreateModalOpen: () => void;
}

type ITripListViewProps = ITripListViewOwnProps & IWithLocalizeOwnProps;

const TripListView: React.FC<ITripListViewProps> = (props: ITripListViewProps) => {
  return props.tripList?.length === 0 ? (
    <div></div>
  ) : (
    <Row justify={'center'} align={'middle'} className="tripListView__container">
      <Col>
        <img src={noUpcomingImage} alt="No Data" className="fullWidth" />
      </Col>

      <Col>
        <Typography.Title level={3}>{props.translate('TRIP_LIST_VIEW.UPCOMING.NO_DATA')}</Typography.Title>
      </Col>

      <Col>
        <Button type="primary" size="large" onClick={props.onTripCreateModalOpen}>
          {props.translate('TRIP_LIST_VIEW.CREATE_FIRST_TRIP_BUTTON')}
        </Button>
      </Col>
    </Row>
  );
};

export default withLocalize<ITripListViewOwnProps>(TripListView as any);
