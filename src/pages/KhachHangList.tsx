import { Layout, Menu, Table, Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/customers");
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddCustomer = async (values: any) => {
    try {
      await axios.post("http://localhost:4000/customers", values);
      message.success("Thêm khách hàng thành công!");
      setModalVisible(false);
      fetchCustomers();
    } catch (error) {
      message.error("Lỗi khi thêm khách hàng!");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên khách hàng", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark" collapsible>
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px" }}>Quản lý</div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="2" icon={<UserOutlined />}>
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
}

export default CustomerList;