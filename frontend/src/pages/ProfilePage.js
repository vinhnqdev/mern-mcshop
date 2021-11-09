import { Col, Row } from "antd";
import React from "react";

import Profile from "../components/Profile/Profile";
import Tabs from "../components/Profile/Tabs";
function ProfilePage() {
  return (
    <Row gutter={[32, { md: 16 }]}>
      <Col span={0} md={{ span: 7 }} lg={{ span: 6 }}>
        <Tabs />
      </Col>

      <Col span={24} md={{ span: 17 }} lg={{ span: 18 }}>
        <Profile />
      </Col>
    </Row>
  );
}

export default ProfilePage;
