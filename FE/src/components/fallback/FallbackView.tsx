import notFoundImage from 'asset/img/not_found_image.svg';
import React from 'react';

export interface IFallbackViewOwnProps {}

type IFallbackViewProps = IFallbackViewOwnProps;

const FallbackView: React.FC<IFallbackViewProps> = (props: IFallbackViewProps) => {
  return (
    <div className="fallbackView__container">
      <img src={notFoundImage} alt="No Data" />
    </div>
  );
};

export default FallbackView;
