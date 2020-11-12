import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const OwnerPetsNew: FC<{}> = () => {
  let { id } = useParams<{ id: string }>();
  const [petTypes, setPetTypes] = useState([]);

  useEffect(() => {
    fetch('/api/pettypes')
      .then((r) => r.json())
      .then((j) => setPetTypes(j));
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    fetch(`/api/owners/${id}/pets`, { method: 'POST', body: JSON.stringify(values), headers: { "Content-Type": "application/json;charset=UTF-8" } })
      .then((r) => console.info('POST add pet status', r.status, r.status === 204 ? 'sucess' : 'failure'));
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
        <Form.Item label="Owner">
          <Input value={id} readOnly disabled />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "may not be empty" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Birth Date" name="birthDate" rules={[{ required: true, message: "may not be empty" }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Type" name="typeId" rules={[{ required: true, message: "may not be empty" }]}>
          <Select aria-required>
            {petTypes.map((e: any) => <Select.Option value={e.id}>{e.name}</Select.Option>)}
          </Select>
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
