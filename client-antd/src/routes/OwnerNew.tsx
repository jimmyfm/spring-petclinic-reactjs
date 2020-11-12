import { Button, Form, Input } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";

export const OwnerNew: FC<{}> = () => {
  const history = useHistory();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    fetch('/api/owner', { method: 'POST', body: JSON.stringify(values), headers: { "Content-Type": "application/json;charset=UTF-8" } })
      .then((r) => r.json())
      .then((j) => history.push({ pathname: `/owner/${j.id}` }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Telephone"
          name="telephone"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
