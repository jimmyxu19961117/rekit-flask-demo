import React, { useState } from 'react';
import { Form, Input, Button, Select, Modal, Descriptions, message } from 'antd';
import axios from 'axios';

export default function FormAddUser(props) {
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 16,
    },
  };

  const [form] = Form.useForm();

  const [data, setData] = useState([]);

  const [visible, setVisible] = useState(false);

  const onFinishNext = values => {
    setData(values);
    console.log('Succeeded:', data);
    setVisible(true);
  };

  const onFinishSubmit = () => {
    axios
      .post('http://127.0.0.1:5001/newuser', data)
      .then(res => {
        setData(res.data);
        console.log('response:', res.data);
        message.success('A New User Is Successfully Added!');
      })
      .catch(error => {
        console.log(error.response['data']);
        message.error(error.response['data'].split('"')[1]);
      });
    console.log('Submitted');
    props.setModalVisible(false);
  };

  const onFinishNextFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="user-form-add-user">
      <Form
        form={form}
        {...layout}
        name="formAddUser"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinishNext}
        onFinishFailed={onFinishNextFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input a name!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input an email!',
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Form.Item
          label="Password"
          name="pswd"
          rules={[
            {
              required: true,
              message: 'Please input passwords!',
            },
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: 'Please select a role!',
            },
          ]}
        >
          <Select placeholder="Select a type of roles" allowClear>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>

          <Modal
            centered
            visible={visible}
            okText="Submit"
            cancelText="Previous"
            onOk={() => {
              onFinishSubmit();
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
            onFinish={onFinishNext}
            onFinishFailed={onFinishNextFailed}
          >
            <Descriptions title="Please Comfirm User Info" bordered column={1}>
              <Descriptions.Item label="Name">{data['name']}</Descriptions.Item>
              <Descriptions.Item label="Email">{data['email']}</Descriptions.Item>
              <Descriptions.Item label="Password">{data['pswd']}</Descriptions.Item>
              <Descriptions.Item label="Role">{data['role']}</Descriptions.Item>
            </Descriptions>
          </Modal>

          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

FormAddUser.propTypes = {};
FormAddUser.defaultProps = {};
