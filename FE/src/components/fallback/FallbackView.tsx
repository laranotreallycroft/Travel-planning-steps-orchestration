import { Col, Row } from 'antd';
import notFoundImage from 'asset/img/not_found_image.svg';
import React from 'react';

export interface IFallbackViewOwnProps {}

type IFallbackViewProps = IFallbackViewOwnProps;

const FallbackView: React.FC<IFallbackViewProps> = (props: IFallbackViewProps) => {
  return (
    <Row className="fallbackView__container" justify={'center'}>
      <Col xs={18} sm={18} md={12} lg={12} xl={12} xxl={12}>
        <img src={notFoundImage} alt="No Data" />
      </Col>
    </Row>
  );
};

export default FallbackView;
