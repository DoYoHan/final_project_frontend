import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

export default function AccountDelete() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.0.209:8090/user/all");
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    handleAccountDelete(selectedUser.email);
    setUsers(users.filter((user) => user.email !== selectedUser.email));
    setSelectedUser(null);
    setModalVisible(false);
  };

  const handleAccountDelete = async (email) => {
    try {
      const token = localStorage.getItem("token"); // 토큰을 로컬 스토리지에서 가져옴
      await axios.delete(`http://192.168.0.209:8090/user/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 요청 헤더에 포함
        },
      });
      console.log(`User ${email} deleted`);
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    {
      title: "닉네임",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "삭제",
      key: "delete",
      render: (user) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteClick(user)}
        >
          삭제
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} />
      <Modal
        title="경고"
        visible={modalVisible}
        onOk={handleDeleteUser}
        onCancel={() => setModalVisible(false)}
        okText="확인"
        cancelText="취소"
      >
        <p>
          "{selectedUser ? selectedUser.email : ""}"의 계정을 삭제하시겠습니까?
        </p>
      </Modal>
    </div>
  );
}
