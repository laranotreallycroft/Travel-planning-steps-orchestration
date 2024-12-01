import { Col, Row, Tag } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import imagePlaceholder from 'asset/img/trip_image_placeholder.svg';
import { toLocalDateFormat } from 'components/common/localize/utils';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { ITrip } from 'model/trip/Trip';
import React from 'react';

export interface ITripCardOwnProps {
  trip: ITrip;
}

type ITripCardProps = ITripCardOwnProps & IWithLocalizeOwnProps;

const TripCard: React.FC<ITripCardProps> = (props: ITripCardProps) => {
  const cityName = props.trip.location.label.substring(0, props.trip.location.label.indexOf(','));
  return (
    <Row justify={'space-between'} className="panel neutral-bg padding-lg">
      <Col span={10}>
        <div className="tripCard_dataContainer">
          <Paragraph ellipsis={{ tooltip: props.trip.label }} className="tripCard_title">
            {props.trip.label}
          </Paragraph>
          <div>
            <span className="tripCard_label tripCard_label-firstWord">{props.translate('TRIP_CARD.FIRST_WORD')}</span>
            <span className="tripCard_label tripCard_label-secondWord">{props.translate('TRIP_CARD.SECOND_WORD')}</span>
            <div className="tripCard_label tripCard_label-thirdWord">{cityName}</div>
          </div>
          <div>
            <Tag>{toLocalDateFormat(props.trip.dateFrom)}</Tag>
            <span className="tripCard_label">-</span> <Tag>{toLocalDateFormat(props.trip.dateTo)}</Tag>
          </div>
        </div>
      </Col>
      <Col span={10}>
        <img src={imagePlaceholder} className="fullWidth fullHeight" alt=""></img>
      </Col>
    </Row>
  );
};

export default withLocalize<ITripCardOwnProps>(TripCard as any);
