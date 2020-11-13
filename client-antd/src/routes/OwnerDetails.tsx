import { Button, Descriptions, Space, Table } from "antd";
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

  const extras = <Space>
    <Button type="primary" onClick={() => history.push({ pathname: `/owner/${owner.id}/pets/new` })}>Add Pet</Button>
    <Button type="primary" onClick={() => history.push({ pathname: `/owner/${owner.id}/edit` })}>Edit</Button>
  </Space>


  return (
    <>
      <Descriptions
        bordered
        title={`${owner.firstName}, ${owner.lastName}`}
        size="small"
        extra={extras}
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
            {
              title: "",
              render: (text: string, r: any) => <Link to={`/owner/${id}/pets/${r.id}/edit`}>Edit Pet</Link>,
            },
            {
              title: "",
              render: (text: string, r: any) => <Link to={`/owner/${id}/pets/${r.id}/visits/new`}>Add Visit</Link>,
            },
          ]} />
        </Descriptions.Item>
      </Descriptions>

    </>
  );
};
