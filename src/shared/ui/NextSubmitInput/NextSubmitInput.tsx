import { Input, Button, ButtonProps, InputProps } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useRef, useEffect } from 'react';
import './NextSubmitInput.scss';

type NextSubmitInputProps = {
  buttonProps?: ButtonProps;
  inputProps?: InputProps;
};

export const NextSubmitInput = ({ buttonProps, inputProps }: NextSubmitInputProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const clickButton = (event: any) => {
      if (event.key === 'Enter' && !buttonRef.current.disabled) {
        buttonRef.current.click();
      }
    };

    document.addEventListener('keydown', clickButton);

    return () => {
      document.removeEventListener('keydown', clickButton);
    };
  }, []);

  return (
    <div className='next-submit-input-container'>
      <Input {...inputProps} />

      <Button ref={buttonRef} {...buttonProps} type='primary' className='submit-btn'>
        <RightOutlined />
      </Button>
    </div>
  );
};
