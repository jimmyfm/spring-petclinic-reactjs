import { Col, Row, Table } from "antd";
import React, { FC, useEffect, useState } from "react";

export const Vet: FC<{}> = () => {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    fetch(`/api/vets`)
      .then(r => r.json())
      .then(j => setVets(j));
  }, []);

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Table size="small" rowKey="id" dataSource={vets} columns={[
            { title: 'Name', render: (text: string, record: any) => <>{record.firstName}, {record.lastName}</> },
            { title: 'Specialties', render: (text: string, r: any) => <>{r.specialties.map((e: any) => e.name).join(", ")}</> }
          ]} />
        </Col>
      </Row>
    </>
  );
};
