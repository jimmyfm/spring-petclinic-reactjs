import React, { useEffect, useState } from "react";
import "./App.css";
import { Breadcrumb, Col, Layout, Menu, Row, Table } from "antd";
import { HomeOutlined, SearchOutlined, } from "@ant-design/icons";
import { Link, Switch, useLocation, Route, Redirect } from "react-router-dom";
import { Owner } from "./routes/Owner";
import { Error } from "./routes/Error";
import { OwnerNew } from "./routes/OwnerNew";
import { Home } from "./routes/Home";
import { OwnerDetails } from "./routes/OwnerDetails";

const { Header, Content, Footer } = Layout;

export function App() {
  const location = useLocation();
  const [current, setCurrent] = useState("home");
  const [vets, setVets] = useState([]);

  useEffect(() => {
    console.info(`location changed`, location);
    setCurrent(location.pathname.substr(1));
  }, [location]);

  useEffect(() => {
    fetch(`/api/vets`)
      .then(r => r.json())
      .then(j => {
        setVets(j.map((e: any) => { return { name: e.firstName + " " + e.lastName, specialties: e.specialties.map((entry: any) => entry.name).join() } }));
      });
  }, []);

  return (<>
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo"><img src="spring-pivotal-logo.png" alt="logo" /></div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/home">Home</Link></Menu.Item>
          <Menu.Item key="owner" icon={<SearchOutlined />} ><Link to="/owner/search"> Find Owners</Link></Menu.Item>
          <Menu.Item key="vet" title="asd" icon={<>👩‍⚕️</>}><Link to="/vet">Veterinarians</Link></Menu.Item>
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
            <Route exact path="/home"><Home /></Route>
            <Route path="/owner/new"><OwnerNew /></Route>
            <Route path="/owner/search/:lastName?"><Owner /></Route>
            <Route path="/owner/:id"><OwnerDetails /></Route>
            <Route path="/vet">
              <Row>
                <Col span={6} push={3}>
                  <Table size="small" rowKey="name" dataSource={vets} columns={[{ title: 'Name', dataIndex: 'name' }, { title: 'Specialties', dataIndex: 'specialties' }]} />
                </Col>
              </Row>
            </Route>
            <Route path="/error"><Error /></Route>
            <Route><Redirect to={{ pathname: "/home" }} /></Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer Text</Footer>
    </Layout>
  </>
  );
}
