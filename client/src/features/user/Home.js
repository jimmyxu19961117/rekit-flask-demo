import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Affix } from 'antd';
import axios from 'axios';
import FormAddUser from './FormAddUser';

export default function Home() {
  const [data, setData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:5001/user/home').then(res => {
      setData(res.data);
      console.log(res);
    });
  }, []);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModelOk = () => {
    setIsAddModalVisible(false);
  };

  const handleAddModelCancel = () => {
    setIsAddModalVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="/#">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: text => <a href="/#">{text}</a>,
    },
    {
      title: 'Password',
      dataIndex: 'pswd',
      key: 'pswd',
      render: text => <a href="/#">{text}</a>,
    },
    {
      title: 'Role ID',
      dataIndex: 'role_id',
      key: 'role_id',
      render: text => <a href="/#">{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a href="/#">Edit</a>
          <a href="/#">Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-home">
      <Affix offsetTop={10}>
        <Button htmlType="button" type="primary" style={{ float: 'right' }} onClick={showAddModal}>
          Add User
        </Button>
        <Modal
          title="Add A New User"
          centered
          visible={isAddModalVisible}
          onOk={handleAddModelOk}
          onCancel={handleAddModelCancel}
        >
          <FormAddUser setModalVisible={setIsAddModalVisible} />
        </Modal>
      </Affix>
      <Table columns={columns} dataSource={data} pagination={true} />
    </div>
  );
}

Home.propTypes = {};
Home.defaultProps = {};
