import { Button, Col, Divider, Form, Input, Row, Space, Table } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

const { Search } = Input;

export const Owner: FC<{}> = () => {
  const history = useHistory();
  const [owners, setOwners] = useState([]);
  let queryString = useLocation().search;

  useEffect(() => {
    let query = new URLSearchParams(queryString);

    if (!new Map(query.entries()).has("lastName")) {
      setOwners([]);
      return;
    }

    fetch(`/api/owner/list?lastName=${query.get("lastName") || ""}`)
      .then((r) => r.json())
      .then((j) => setOwners(j));
  }, [queryString]);

  const onSearch = (searchText: any) => {
    console.log("searching", searchText);
    history.push({
      pathname: `/owner/search`,
      search: `?lastName=${searchText || ""}`,
    });
  };

  return (
    <>
      <Row justify="end">
        <Col span={24}>
          <Space style={{ float: "right" }}>
            <Search placeholder="Search by last name" allowClear onSearch={onSearch} />
            <Button onClick={() => history.push({ pathname: `/owner/new` })}>Add Owner</Button>
          </Space>
        </Col>
      </Row>

      <Divider />

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
            render: (text: string, r: any) => (
              <>{r.pets.map((e: any) => e.name).join(", ")}</>
            ),
          },
        ]}
      ></Table>
    </>
  );
};
