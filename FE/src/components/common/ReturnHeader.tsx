import { CaretLeftOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export interface IReturnHeaderOwnProps {
  label: string;
  to: string;
}
type IReturnHeaderProps = IReturnHeaderOwnProps;

const ReturnHeader: React.FC<IReturnHeaderProps> = (props: IReturnHeaderProps) => {
  return (
    <Link to={props.to}>
      <Row gutter={8} className="margin-bottom-lg returnHeader__row">
        <Col>
          <CaretLeftOutlined />
        </Col>
        <Col> {props.label}</Col>
      </Row>
    </Link>
  );
};

export default ReturnHeader;
