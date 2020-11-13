import React, { useEffect, useState } from "react";
import "./App.css";
import { Breadcrumb, Layout, Menu } from "antd";
import { HomeOutlined, SearchOutlined, } from "@ant-design/icons";
import { Link, Switch, useLocation, Route, Redirect } from "react-router-dom";
import { Owner } from "./routes/Owner";
import { Error } from "./routes/Error";
import { OwnerNew } from "./routes/OwnerNew";
import { Home } from "./routes/Home";
import { OwnerDetails } from "./routes/OwnerDetails";
import { OwnerPetsNew } from "./routes/OwnerPetsNew";
import { Vet } from "./routes/Vet";
import { OwnerEdit } from "./routes/OwnerEdit";
import { OwnerPetsEdit } from "./routes/OwnerPetsEdit";

const { Header, Content, Footer } = Layout;

export function App() {
  const location = useLocation();
  const [current, setCurrent] = useState("home");

  useEffect(() => {
    console.info(`location changed`, location);
    setCurrent(location.pathname.split('\/')[1]);
  }, [location]);

  return (<>
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo"><img src="spring-pivotal-logo.png" alt="logo" /></div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[current]}
          onChange={(event: React.FormEvent<HTMLDivElement>) => console.log('menu click', event)}
          onSelect={(info: any) => console.log('menu select', info)}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/home">Home</Link></Menu.Item>
          <Menu.Item key="owner" icon={<SearchOutlined />} ><Link to="/owner/search"> Find Owners</Link></Menu.Item>
          <Menu.Item key="vet" icon={<>👩‍⚕️</>}><Link to="/vet">Veterinarians</Link></Menu.Item>
          <Menu.Item key="error" danger icon={<>⚠</>}><Link to="/error">Error</Link></Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>BreadCrumbs</Breadcrumb.Item>
          <Breadcrumb.Item>Not</Breadcrumb.Item>
          <Breadcrumb.Item>Used</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/owner/new" component={OwnerNew} />
            <Route path="/owner/search" component={Owner} />
            <Route path="/owner/:id/pets/new" component={OwnerPetsNew} />
            <Route path="/owner/:ownerId/pets/:petId/edit" component={OwnerPetsEdit} />
            <Route path="/owner/:id/edit" component={OwnerEdit} />
            <Route path="/owner/:id" component={OwnerDetails} />
            <Route path="/vet" component={Vet} />
            <Route path="/error" component={Error} />
            <Route><Redirect to={{ pathname: "/home" }} /></Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer Text</Footer>
    </Layout>
  </>
  );
}
