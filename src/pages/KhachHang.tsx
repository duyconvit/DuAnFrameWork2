import { Layout, Menu, Table, Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  LoginOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Gọi dữ liệu khách hàng từ API
  const fetchCustomers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/customers");
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Khi mở trang sẽ gọi fetch
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Hàm thêm khách hàng thủ công (qua form)
  const handleAddCustomer = async (values) => {
    try {
      await axios.post("http://localhost:4000/customers", values);
      message.success("Thêm khách hàng thành công!");
      setModalVisible(false);
      fetchCustomers(); // load lại danh sách
    } catch (error) {
      message.error("Lỗi khi thêm khách hàng!");
    }
  };

  // ✅ Hàm thêm khách hàng từ nơi khác (ví dụ sau khi thanh toán)
  const addCustomerFromCheckout = async (customer) => {
    try {
      await axios.post("http://localhost:4000/customers", customer);
      setCustomers([...customers, customer]); // cập nhật danh sách không cần fetch lại
      message.success("Đã thêm khách hàng sau thanh toán!");
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi thêm khách hàng từ thanh toán!");
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
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px" }}>
          Admin
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["3"]}>
          <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
            <Link to="/products">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/orders">Đơn Hàng</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            <Link to="/customers">Khách Hàng</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<EditOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "18px" }}>
          Danh sách khách hàng
        </Header>
        <Content style={{ margin: "16px" }}>
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Thêm khách hàng
          </Button>
          <Table
            columns={columns}
            dataSource={customers}
            rowKey="id"
            bordered
            pagination={{ pageSize: 20 }}
          />
        </Content>
      </Layout>

      {/* Modal Thêm khách hàng */}
      <Modal
        title="Thêm khách hàng"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCustomer}>
          <Form.Item
            label="Tên khách hàng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};
export const addCustomerFromCheckout = async (customer: any) => {
  try {
    await axios.post("http://localhost:4000/customers", customer);
    message.success("Đã thêm khách hàng sau thanh toán!");
  } catch (error) {
    console.error(error);
    message.error("Lỗi khi thêm khách hàng từ thanh toán!");
  }
};


export default CustomerList;
