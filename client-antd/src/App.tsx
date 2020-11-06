import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Checkbox, Col, Input, Menu, Row, Table } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { HashRouter, Link, Switch, useLocation, Route, useHistory, useParams } from "react-router-dom";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import { OwnersList } from "./OwnersList";

export function App() {
  const location = useLocation();
  let { lastName } = useParams<{ lastName: string }>();
  const [current, setCurrent] = useState("home");
  const [vets, setVets] = useState([]);
  const [error, setError] = useState<{ status?: string, message?: string }>({});
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    setCurrent(location.pathname.substr(1));
  }, [location]);

  useEffect(() => {
    fetch(`/api/vets`)
      .then(r => r.json())
      .then(j => {
        setVets(j.map((e: any) => { return { name: e.firstName + " " + e.lastName, specialties: e.specialties.map((entry: any) => entry.name).join() } }));
      });

    fetch(`/api/oups`)
      .then(r => r.json())
      .then(j => setError(j));

    console.log(`location`, location);
  }, []);

  let handleClick = (e: any) => {
    console.log("click ", e);
    //setCurrent(e.key);
  };


  return (<>
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <img src="spring-pivotal-logo.png" />
      <Menu.Item key="home" icon={<MailOutlined />}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="owner" icon={<AppstoreOutlined />}>
        <Link to="/owner"> Find Owners</Link>
      </Menu.Item>
      <Menu.Item key="vet" icon={<MailOutlined />}>
        <Link to="/vet">Veterinarians</Link>
      </Menu.Item>
      <Menu.Item key="error" icon={<SettingOutlined />}>
        <Link to="/error">Error</Link>
      </Menu.Item>
    </Menu>

    <Switch>
      <Route exact path="/home">
        <Row>
          <Col span={6} push={3}>
            <img src="pets.png" />
          </Col>
        </Row>
      </Route>
      <Route path="/owner/:lastName?">
       <OwnersList/>
      </Route>
      <Route path="/vet">
        <Row>
          <Col span={6} push={3}>
            <Table dataSource={vets} columns={[{ title: 'Name', dataIndex: 'name', key: 'name', }, { title: 'Specialties', dataIndex: 'specialties', key: 'specialties', }]}></Table>
          </Col>
        </Row>
      </Route>
      <Route path="/error">
        <p>{error.status}</p>
        <p>{error.message}</p>
      </Route>
    </Switch>
  </>
  );
}
