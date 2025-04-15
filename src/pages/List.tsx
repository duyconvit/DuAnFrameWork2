import { Layout, Menu, Table, Button, Avatar, Space, message } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "@/interface/type";
import { UserOutlined, ShoppingCartOutlined, BarChartOutlined, LoginOutlined, EditOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const List = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [students, setStudents] = useState<IProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/students`);
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const DelStudent = async (id: number | string) => {
    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      setStudents(students.filter((item) => item.id !== id));
      message.success("Xóa thành công!");
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi xóa sản phẩm!");
    }
  };

  const columns = [
    { title: "STT", dataIndex: "index", key: "index", render: (_: unknown, __: unknown, index: number) => index + 1 },
    { title: "Ảnh sản phẩm", dataIndex: "image", key: "image", render: (image: string) => <Avatar shape="square" size={64} src={image} /> },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Giá tiền", dataIndex: "price", key: "price", render: (price: number) => `${price} VNĐ` },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    {
      title: "Hành động",
      key: "action",
      render: (_: unknown, record: IProduct) => (
        <Space>
          <Link to={`/products/${record.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          <Button danger onClick={() => DelStudent(record.id)}>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px" }}>Admin</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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
        <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "18px" }}>Danh sách sản phẩm</Header>
        <Content style={{ margin: "16px" }}>
          {/* Nút Thêm sản phẩm */}
          <div style={{ marginBottom: "16px" }}>
            <Link to="/products/add">
              <Button type="primary">Thêm sản phẩm</Button>
            </Link>
          </div>

          <Table columns={columns} dataSource={students} rowKey="id" bordered pagination={{ pageSize: 20 }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default List;
