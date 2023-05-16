import { Button, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

export const Login = () => {
  const handleButtonClick = () => {
    window.location.href = 'https://www.youtube.com/watch?v=vUXzn-xTeA0';
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white relative">
      <Card
        id={'login-card'}
        bordered={false}
        style={{
          width: 400,
          height: 400,
          backgroundColor: '#84fa84',
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          filter: 'drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.5))',
        }}
      >
        <Card
          bordered={false}
          id={'icon-card'}
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            overflow: 'hidden',
            backgroundColor: '#5DDE5D',
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <UserOutlined id={'user-icon'} style={{ fontSize: '120px', backgroundColor: '#5DDE5D' }} />
          </div>
        </Card>

        <Typography.Title
          id={'card-title'}
          level={1}
          style={{ textAlign: 'center', marginBottom: '40px', marginTop: '-80px', color: '#000000' }}
        >
          ReptiMate
        </Typography.Title>
        <Button
          id={'login-button'}
          style={{
            width: '100%',
            height: '60px',
            backgroundColor: '#2fbb2f',
            color: '#FFFFFF',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#084908';
            (e.currentTarget as HTMLButtonElement).style.border = 'none';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#2fbb2f';
          }}
          onClick={handleButtonClick}
        >
          LOGIN WITH GOOGLE
        </Button>
      </Card>
    </div>
  );
};

export default Login;
