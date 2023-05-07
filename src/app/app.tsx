import { Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { HomeOutlined, TwitterOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import {RoutingTable} from "@lizards-inc-fe/shared-components";

export const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const items: ItemType[] = [
    {
      key: RoutingTable.home.root,
      icon: <HomeOutlined />,
      label: `Home`,
    },
    {
      key: RoutingTable.animals.root,
      icon: <TwitterOutlined />,
      label: `Animals`,
    },
    {
      key: RoutingTable.limitsAndBoundaries.root,
      icon: <HomeOutlined />,
      label: 'Limits and Boundaries'
    }
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
        <Layout style={{ padding: '24px' }}>
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
