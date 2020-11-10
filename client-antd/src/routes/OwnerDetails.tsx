import { Button, Descriptions, Input, Table } from "antd";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React, { FC, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

export const OwnerDetails: FC<{}> = () => {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();
  const [owner, setOwner] = useState<any>({});

  useEffect(() => {
    fetch(`/api/owner/${id}`)
      .then((r) => r.json())
      .then((j) => setOwner(j));
  }, [id]);

  return (
    <>
      <Descriptions
        bordered
        title={`${owner.firstName}, ${owner.lastName}`}
        size="small"
        extra={<Button type="primary">Edit</Button>}
      >
        <Descriptions.Item label="Address">{owner.address}</Descriptions.Item>
        <Descriptions.Item label="City">{owner.city}</Descriptions.Item>
        <Descriptions.Item label="ID">{owner.id}</Descriptions.Item>
        <Descriptions.Item label="Pets">
          <Table size="small" rowKey="id" dataSource={owner.pets} columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Birth Date",
              dataIndex: "birthDate",
            },
            {
              title: "Type",
              render: (text: string, record: any) => <>{record.type.name}</>,
            },
          ]} />
        </Descriptions.Item>
      </Descriptions>

    </>
  );
};
