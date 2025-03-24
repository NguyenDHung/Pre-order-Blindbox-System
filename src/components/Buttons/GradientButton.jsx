import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  buttonWrapper: css`
    .gradient-btn {
      position: relative;
      display: inline-block;
      padding: 4px 20px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-transform: uppercase;
      background: linear-gradient(90deg, #ff512f, #dd2476);
      background-size: 300% 300%;
      transition: all 0.3s ease-in-out;
      box-shadow: 0px 4px 15px rgba(255, 81, 47, 0.5);
      animation: gradientMove 3s infinite linear;
    }

    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .gradient-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0px 6px 20px rgba(255, 81, 47, 0.8);
    }

    .gradient-btn:active {
      transform: scale(0.95);
      box-shadow: 0px 3px 10px rgba(255, 81, 47, 0.6);
    }

    .disabled-btn {
      background: #b3b3b3 !important;
      color: #fff !important;
      cursor: not-allowed;
      box-shadow: none;
    }
  `,
}));

const GradientButton = ({ text, onClick, disabled = false, className ="" }) => {
  const { styles } = useStyle();

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            borderRadius: 2,
            colorPrimary: '#ff512f',
          },
        },
      }}
    >
      <div className={styles.buttonWrapper}>
        <Button 
          className={`gradient-btn ${disabled ? 'disabled-btn' : ''} ${className}`}
          onClick={onClick}
          size="large"
          disabled={disabled}
        >
          {text}
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default GradientButton;
