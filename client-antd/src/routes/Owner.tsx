import { Button, Form, Input, Table } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

export const Owner: FC<{}> = () => {
  const history = useHistory();
  let { lastName } = useParams<{ lastName: string }>();
  const [owners, setOwners] = useState([]);
  let queryString = useLocation().search;

  const onFinish = (values: any) => {
    console.log("Success:", values);
    history.push({ pathname: `/owner/search`, search: `?lastName=${values.lastName || ''}`, });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    let query = new URLSearchParams(queryString);

    if (!new Map(query.entries()).has('lastName')) {
      setOwners([]);
      return;
    }

    fetch(`/api/owner/list?lastName=${query.get("lastName") || ''}`)
      .then((r) => r.json())
      .then((j) => setOwners(j));
  }, [queryString]);

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="lastName"
          name="lastName"
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={() => history.push({ pathname: `/owner/new` })}>
        Add Owner
      </Button>
      lastname : {lastName}
  
      <Table
        size="small"
        rowKey="id"
        dataSource={owners}
        columns={[
          {
            title: "Name",
            render: (text: string, record: any) => <Link to={`/owner/${record.id}`}>{record.firstName}, {record.lastName}</Link>
          },
          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "City",
            dataIndex: "city",
          },
          {
            title: "Telephone",
            dataIndex: "telephone",
          },
          {
            title: "Pets",
            render: (text: string, r: any) => <>{r.pets.map((e: any) => e.name).join(", ")}</>
          },
        ]}
      ></Table>
    </>
  );
};
