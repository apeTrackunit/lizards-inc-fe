import { Drawer, Layout, Menu, theme } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { HomeOutlined, TwitterOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

export const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const items: ItemType[] = [
    {
      key: `home`,
      icon: <HomeOutlined />,
      label: `Home`,
    },
    {
      key: `animals`,
      icon: <TwitterOutlined />,
      label: `Animals`,
    },
  ];
  const handleResize = () => {
    setPageWidth(window.innerWidth);
  };

  const handleSideBarCollapseClick = () => {
    setCollapsed(prevState => !prevState);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <Layout style={{ height: '100vh' }}>
      <div className={'flex flex-row h-14 items-center bg-white drop-shadow p-4'}>
        {pageWidth > 576 && <div className={'font-bold text-lg mr-4'}>ReptiMate</div>}
        <div className={'sm:mb-1 mb-0.5'} onClick={handleSideBarCollapseClick}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
      <Layout>
        {pageWidth > 576 ? (
          <Sider className={'drop-shadow'} trigger={null} collapsible collapsed={collapsed}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items}
              onClick={obj => navigate(obj.key)}
            />
          </Sider>
        ) : (
          <Drawer
            title="ReptiMate"
            placement={'left'}
            closable={false}
            onClose={() => setCollapsed(false)}
            open={collapsed}
            width={300}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items}
              onClick={obj => {
                navigate(obj.key);
                setCollapsed(false);
              }}
            />
          </Drawer>
        )}

        <Layout className={'p-5'}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
