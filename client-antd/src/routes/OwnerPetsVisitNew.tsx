import { Button, DatePicker, Form, Input, notification, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const OwnerPetsVistNew: FC<{}> = () => {
  const history = useHistory();
  let { ownerId, petId } = useParams<{ ownerId: string, petId: string }>();

  useEffect(() => {
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    values.date = values.date.format('YYYY/MM/DD');
    fetch(`/api/owners/${ownerId}/pets/${petId}/visits`, { method: 'POST', body: JSON.stringify(values), headers: { "Content-Type": "application/json;charset=UTF-8" } })
      .then((r) => {
        console.info('POST add visit status', r.status, r.status === 204 ? 'sucess' : 'failure')
        if (r.status === 204) {
          history.push(`/owner/${ownerId}`);
        } else {
          notification["error"]({
            message: "Something went wrong",
            description: "Terribly wrong",
          });
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="Owner">
          <Input value={ownerId} readOnly disabled />
        </Form.Item>
        <Form.Item label="Pet">
          <Input value={petId} readOnly disabled />
        </Form.Item>
        <Form.Item label="Date" name="date" rules={[{ required: true, message: "may not be empty" }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: "may not be empty" }]}>
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
