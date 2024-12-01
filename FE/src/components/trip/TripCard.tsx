import { Col, Row, Tag } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import imagePlaceholder from 'asset/img/trip_image_placeholder.svg';
import { toLocalDateFormat } from 'components/common/localize/utils';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { ITrip } from 'model/trip/Trip';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface ITripCardOwnProps {
  trip: ITrip;
}

type ITripCardProps = ITripCardOwnProps & IWithLocalizeOwnProps;

const TripCard: React.FC<ITripCardProps> = (props: ITripCardProps) => {
  const navigator = useNavigate();
  const cityName = props.trip.location.label.substring(0, props.trip.location.label.indexOf(','));
  return (
    <Row justify={'space-between'} className="tripCard__card panel padding-lg" onClick={() => navigator(`/trips/${props.trip.id}`)}>
      <Col span={10}>
        <div className="tripCard__dataContainer">
          <Paragraph ellipsis={{ tooltip: props.trip.label }} className="tripCard__title">
            {props.trip.label}
          </Paragraph>
          <div>
            <span className="tripCard__label tripCard__label-firstWord">{props.translate('TRIP_CARD.FIRST_WORD')}</span>
            <span className="tripCard__label tripCard__label-secondWord">{props.translate('TRIP_CARD.SECOND_WORD')}</span>
            <div className="tripCard__label tripCard__label-thirdWord">{cityName}</div>
          </div>
          <div>
            <Tag>{toLocalDateFormat(props.trip.dateFrom)}</Tag>
            <span className="tripCard__label">-</span> <Tag>{toLocalDateFormat(props.trip.dateTo)}</Tag>
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
