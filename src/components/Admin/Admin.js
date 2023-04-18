import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountDelete from "./AccountDelete";
import Announcement from "./Announcement";
import AdminChart from "../Charts/AdminChart";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  DeleteOutlined,
  SoundOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import "../../css/adminGoBackButton.css";
import axios from "axios";

const { Header, Content, Sider } = Layout;

export default function Admin() {
  const [showDelete, setShowDelete] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [adminUserAll, setAdminUserAll] = useState([]);
  const [adminPost, setAdminPost] = useState([]);

  const handleDeleteToggle = () => {
    setShowDelete(!showDelete);
  };
  const handleAnnouncementToggle = () => {
    setShowAnnouncement(!showAnnouncement);
  };
  const handleChartToggle = () => {
    setShowChart(!showChart);
    // admin 통계에서 사용할 데이터 관련
    axios
      .get("http://192.168.0.209:8090/user/all")
      .then((response) => {
        setAdminUserAll(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://192.168.0.209:8090/post")
      .then((response) => {
        setAdminPost(response.data);
        // console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleMenuItemClick = (event) => {
    const target = event.key;
    if (target === "delete") {
      handleDeleteToggle();
    } else if (target === "announcement") {
      handleAnnouncementToggle();
    } else if (target === "chart") {
      handleChartToggle();
    }
  };
  // 뒤로 이동하는 함수
  const movePage = useNavigate();

  function goBack() {
    movePage(-1);
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <h1 style={{ color: "#fff" }}>관리자 페이지</h1>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        {/* Home 버튼 */}
        <br />
        <button onClick={goBack} id="AdminGoBackButton">
          <RollbackOutlined />
          &nbsp;&nbsp;뒤로&nbsp;가기
        </button>
        <Layout
          className="site-layout-background"
          style={{
            padding: "20px 0",
          }}
        >
          <Sider className="site-layout-background" width={"auto"}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[]}
              style={{
                height: "100%",
                fontFamily: "Noto Sans KR",
                fontSize: "1rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
              onClick={handleMenuItemClick}
            >
              {/* 메뉴 앞에 아이콘 추가 */}
              <Menu.Item key="delete">
                <DeleteOutlined />
                &nbsp;&nbsp;계정 삭제
              </Menu.Item>
              <Menu.Item key="announcement">
                <SoundOutlined />
                &nbsp;&nbsp;공지사항
              </Menu.Item>

              <Menu.Item key="chart">
                <BarChartOutlined />
                &nbsp;&nbsp;통계
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: "auto" }}>
            {showDelete && <AccountDelete />}
            {showAnnouncement && <Announcement />}
            {showChart && (
              <AdminChart adminUserAll={adminUserAll} adminPost={adminPost} />
            )}
          </Content>
        </Layout>
      </Content>
      <Header>
        <div className="logo" />
      </Header>
    </Layout>
  );
}
