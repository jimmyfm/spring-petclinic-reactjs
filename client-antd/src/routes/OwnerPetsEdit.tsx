import { Button, DatePicker, Form, Input, notification, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from 'moment';

export const OwnerPetsEdit: FC<{}> = () => {
  const history = useHistory();
  let { ownerId, petId } = useParams<{ ownerId: string, petId: string }>();
  const [petTypes, setPetTypes] = useState([]);
  const [pet, setPet] = useState<any>({})

  useEffect(() => {
    fetch('/api/pettypes')
      .then((r) => r.json())
      .then((j) => setPetTypes(j));

    fetch(`/api/owners/${ownerId}/pets/${petId}`)
      .then((r) => r.json())
      .then((j) => {
        j.birthDate = moment(j.birthDate, "YYYY/MM/DD");
        setPet(j)
      });
  }, [ownerId, petId]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    values.birthDate = values.birthDate.format('YYYY/MM/DD');
    fetch(`/api/owners/${ownerId}/pets/${petId}`, { method: 'PUT', body: JSON.stringify(values), headers: { "Content-Type": "application/json;charset=UTF-8" } })
      .then((r) => {
        console.info('POST add pet status', r.status, r.status === 204 ? 'sucess' : 'failure')
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
      {pet.id &&
        <Form
          name="basic"
          initialValues={pet}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Owner">
            <Input readOnly disabled />
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
        </Form>}
    </>
  );
};
