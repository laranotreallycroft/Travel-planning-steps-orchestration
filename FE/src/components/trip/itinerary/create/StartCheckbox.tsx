import { AimOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';

interface IStartCheckboxOwnProps {
  value?: boolean;
  onChange?: (checked: boolean) => void;
}

type IStartCheckboxProps = IStartCheckboxOwnProps;

const StartCheckbox: React.FC<IStartCheckboxProps> = (props: IStartCheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(props.value ?? false);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    props.onChange?.(newValue);
  };

  return (
    <div onClick={handleToggle}>
      {checked ? (
        <Button type="primary">
          <AimOutlined />
        </Button>
      ) : (
        <Button>
          <AimOutlined />
        </Button>
      )}
    </div>
  );
};

export default StartCheckbox;
