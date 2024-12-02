import { Col, Row, Tag } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import imagePlaceholder from 'asset/img/trip_image_placeholder.svg';
import { toLocalDateFormat } from 'components/common/localize/utils';
import withLocalize, { IWithLocalizeOwnProps } from 'components/common/localize/withLocalize';
import { classNames } from 'components/common/util/classNames';
import { ITrip } from 'model/trip/Trip';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ITripCardOwnProps {
  trip: ITrip;
  isClickable?: boolean;
}

type ITripCardProps = ITripCardOwnProps & IWithLocalizeOwnProps;

const TripCard: React.FC<ITripCardProps> = (props: ITripCardProps) => {
  const navigator = useNavigate();
  const cityName = props.trip.location.label.substring(0, props.trip.location.label.indexOf(','));

  const cardClassName = useMemo(
    () =>
      classNames({
        tripCard__card: true,
        panel: true,
        'padding-lg': true,
        'tripCard__card-clickable': props.isClickable ?? false,
      }),
    [props.isClickable]
  );

  const handleCardClick = useCallback(() => {
    navigator(`/trips/${props.trip.id}`);
  }, [props.trip.id]);

  return (
    <Row className={cardClassName} onClick={props.isClickable ? handleCardClick : undefined}>
      <Col span={14}>
        <div className="tripCard__dataContainer">
          <Paragraph ellipsis={{ tooltip: props.trip.label }} className="tripCard__title">
            {props.trip.label}
          </Paragraph>
          <div>
            <span className="tripCard__label tripCard__label-firstWord">{props.translate('TRIP_CARD.FIRST_WORD')}</span>
            <span className="tripCard__label tripCard__label-secondWord">{props.translate('TRIP_CARD.SECOND_WORD')}</span>
            <div className="tripCard__label tripCard__label-thirdWord">{cityName}</div>
          </div>
          <Row gutter={[4, 4]}>
            <Col>
              <Tag className="tripCard__tag">{toLocalDateFormat(props.trip.dateFrom)}</Tag>
            </Col>
            <Col>
              <span className="tripCard__label">-</span>
            </Col>
            <Col>
              <Tag className="tripCard__tag">{toLocalDateFormat(props.trip.dateTo)}</Tag>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={10} className="tripCard__imgCol">
        <img src={imagePlaceholder} className="tripCard__img" alt=""></img>
      </Col>
    </Row>
  );
};

export default withLocalize<ITripCardOwnProps>(TripCard as any);
