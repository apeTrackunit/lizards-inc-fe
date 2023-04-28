import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { HomeOutlined, TwitterOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

export const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();

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

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header">
        <div className="logo">Lizards Inc</div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
            onClick={obj => navigate(obj.key)}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbs.slice(1, breadcrumbs.length).map(x => (
              <Breadcrumb.Item>{x.breadcrumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
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
