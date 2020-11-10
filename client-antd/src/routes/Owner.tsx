import { Button, Input, Table } from "antd";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React, { FC, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

export const Owner: FC<{}> = () => {
  const history = useHistory();
  let { lastName } = useParams<{ lastName: string }>();
  const [owners, setOwners] = useState([]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    history.push({ pathname: `/owner/search/${values.lastName}` });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    //if (!lastName) return;

    fetch(`/api/owner/list?lastName=${lastName}`)
      .then((r) => r.json())
      .then((j) => setOwners(j));
  }, [lastName]);

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
        <FormItem
          label="lastName"
          name="lastName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </FormItem>

        <FormItem wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
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
            render: (text: string, record: any) => (
              <Link to={`/owner/${record.id}`}>
                {record.firstName}, {record.lastName}
              </Link>
            ),
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
            render: (text: string, record: any) => (
              <>{record.pets.map((r: any) => r.name).join(", ")}</>
            ),
          },
        ]}
      ></Table>
    </>
  );
};
