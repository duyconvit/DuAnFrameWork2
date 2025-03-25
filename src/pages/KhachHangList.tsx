import { Layout, Menu, Table, Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark" collapsible>
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px" }}>Quản lý</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/customers">Khách hàng</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "18px" }}>Danh sách khách hàng</Header>
        <Content style={{ margin: "16px" }}>
          <Button type="primary" onClick={() => setModalVisible(true)}>Thêm khách hàng</Button>
          <Table columns={columns} dataSource={customers} rowKey="id" bordered pagination={{ pageSize: 5 }} />
        </Content>
      </Layout>

      {/* Modal Thêm khách hàng */}
      <Modal title="Thêm khách hàng" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddCustomer}>
          <Form.Item label="Tên khách hàng" name="name" rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Thêm</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );

export default CustomerList;