import { Layout, Menu, Table, Button, Space, message } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCartOutlined, UserOutlined, OrderedListOutlined, EditOutlined, LoginOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const OrderManagement = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [orders, setOrders] = useState([]);

  // Fetch danh sách đơn hàng từ API
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/orders`);
        console.log("Dữ liệu đơn hàng:", data); // Kiểm tra dữ liệu API
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Cập nhật trạng thái đơn hàng
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:4000/orders/${id}`, { status });
      setOrders(orders.map(order => order.id === id ? { ...order, status } : order));
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi cập nhật trạng thái!");
    }
  };



  // Cấu hình bảng hiển thị đơn hàng
  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Tên khách hàng", dataIndex: "customerName", key: "customerName" },
    { 
      title: "Sản phẩm", 
      dataIndex: "products", 
      key: "products",
      render: (products) => (
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.name}</li>
          ))}
        </ul>
      )
    },
    { 
      title: "Giá sản phẩm", 
      dataIndex: "products", 
      key: "productPrices",
      render: (products) => (
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.price.toLocaleString()} VNĐ</li>
          ))}
        </ul>
      )
    },
    { title: "Tổng tiền", dataIndex: "total", key: "total", render: (total) => `${total.toLocaleString()} VNĐ` },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => updateStatus(record.id, "Đã giao")} type="primary">Đã giao</Button>
          <Button onClick={() => updateStatus(record.id, "Đã hủy")} danger>Hủy</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px" }}>Quản lý</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
            <Link to="/students">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/orders">Đơn Hàng</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<OrderedListOutlined />}>
            <Link to="/admin/reports">Khách Hàng</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<EditOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Nội dung chính */}
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "18px" }}>
          Danh sách đơn hàng
        </Header>
        <Content style={{ margin: "16px" }}>
          <Table columns={columns} dataSource={orders} rowKey="id" bordered pagination={{ pageSize: 5 }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrderManagement;
