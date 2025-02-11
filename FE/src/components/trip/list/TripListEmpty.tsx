import { Button, Col, Row, Typography } from 'antd';
import noUpcomingImage from 'asset/img/no_upcoming.svg';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import React from 'react';

export interface ITripListEmptyOwnProps {
  onTripCreateModalOpen?: () => void;
  isUpcomingTrips?: boolean;
}

type ITripListEmptyProps = ITripListEmptyOwnProps & IWithLocalizeOwnProps;

const TripListEmpty: React.FC<ITripListEmptyProps> = (props: ITripListEmptyProps) => {
  return (
    <Row justify={'center'} align={'middle'} className="fullHeight flex-col">
      <Col>
        <img src={noUpcomingImage} alt="No Data" className="fullWidth" />
      </Col>

      <Col>
        <Typography.Title level={3}>{props.isUpcomingTrips ? props.translate('TRIP_LIST_VIEW.UPCOMING.NO_DATA') : props.translate('TRIP_LIST_VIEW.PAST.NO_DATA')}</Typography.Title>
      </Col>

      {props.isUpcomingTrips && (
        <Col>
          <Button type="primary" size="large" onClick={props.onTripCreateModalOpen}>
            {props.translate('TRIP_LIST_VIEW.CREATE_FIRST_TRIP_BUTTON')}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default withLocalize<ITripListEmptyOwnProps>(TripListEmpty as any);
