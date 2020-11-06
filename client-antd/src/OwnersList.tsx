import { Button, Input, Table } from "antd";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const OwnersList: FC<{}> = () => {
    const history = useHistory();
    let { lastName } = useParams<{ lastName: string }>();
    const [owners, setOwners] = useState([]);

    const onFinish = (values: any) => {
        console.log("Success:", values);
        history.push({ pathname: `/owner/${values.lastName}` });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (!lastName) return;

        fetch(`/api/owner/list?lastName=${lastName}`)
            .then(r => r.json())
            .then(j => setOwners(j));
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
      lastname : {lastName}
            <Table dataSource={owners} columns={[
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                },
                {
                    title: 'city',
                    dataIndex: 'city',
                    key: 'city',
                },
                {
                    title: 'firstName',
                    dataIndex: 'firstName',
                    key: 'firstName',
                },
                {
                    title: 'lastName',
                    dataIndex: 'lastName',
                    key: 'lastName',
                },
                {
                    title: 'telephone',
                    dataIndex: 'telephone',
                    key: 'telephone',
                },
                {
                    title: 'pets',
                    dataIndex: 'pets',
                    key: 'pets',
                }]}>

            </Table>
        </>
    );
};
