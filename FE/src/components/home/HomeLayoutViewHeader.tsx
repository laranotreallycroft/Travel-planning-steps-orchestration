import { Col, Row, Select } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import logo from 'asset/img/logo.png';
import { ITrip } from 'model/trip/Trip';
import React from 'react';

export interface IHomeLayoutViewHeaderOwnProps {
  tripList: ITrip[];
  trip: ITrip;
  onTripSelect: (selectedTripId: number) => void;
}

type IHomeLayoutViewHeaderProps = IHomeLayoutViewHeaderOwnProps;

const HomeLayoutViewHeader: React.FC<IHomeLayoutViewHeaderProps> = (props: IHomeLayoutViewHeaderProps) => {
  return (
    <Row align={'middle'} gutter={[16, 16]}>
      <Col xs={0} sm={10} md={6} lg={6} xl={4}>
        <Avatar src={logo} shape="square" className="fullSize" />
      </Col>
      <Col xs={12} sm={8} md={8} lg={8} xl={5}>
        <Select
          className="fullWidth"
          onChange={props.onTripSelect}
          value={props.trip?.id}
          options={props.tripList?.map((trip: ITrip) => {
            return {
              value: trip.id,
              label: trip.label,
            };
          })}
        />
      </Col>
    </Row>
  );
};

export default HomeLayoutViewHeader;
