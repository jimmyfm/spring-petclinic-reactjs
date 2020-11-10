import { Button, Input } from "antd";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React, { FC } from "react";

export const OwnerNew: FC<{}> = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    //        history.push({ pathname: `/owner/${values.lastName}` });
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
        <FormItem
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label="Address"
          name="address"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label="City"
          name="city"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </FormItem>

        <FormItem
          label="Telephone"
          name="telephone"
          rules={[{ required: true, message: "may not be empty" }]}
        >
          <Input />
        </FormItem>

        <FormItem wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    </>
  );
};
