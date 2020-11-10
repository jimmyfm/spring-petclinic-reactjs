import { Col, Row } from "antd";
import React, { FC } from "react";

export const Home: FC<{}> = () => {
    return (
        <>
            <Row>
                <Col span={6} push={3}>
                    <img src="pets.png" alt="cute pups" />
                </Col>
            </Row>
        </>
    );
};
