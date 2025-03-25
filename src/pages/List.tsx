import { Layout, Menu, Table, Button, Avatar, Space, message } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "@/interface/type";
import { UserOutlined, ShoppingCartOutlined, BarChartOutlined } from "@ant-design/icons";

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
      await axios.delete(`http://localhost:4000/students/${id}`);
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
          <Link to={`/students/${record.id}`}>
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
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px" }}>Điện Thoại</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ShoppingCartOutlined />,
              label: <Link to="/students" style={{ textDecoration: "none" }}>Sản phẩm</Link>
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/orders" style={{ textDecoration: "none" }}>Đơn Hàng</Link>
            },
            {
              key: "3",
              icon: <BarChartOutlined />,
              label: <Link to="/admin/reports" style={{ textDecoration: "none" }}>Khách Hàng</Link>
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: "16px", textAlign: "center", fontSize: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Danh sách sản phẩm</span>
          <Link to="/students/add">
            <Button type="primary">+ Thêm sản phẩm</Button>
          </Link>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Table columns={columns} dataSource={students} rowKey="id" bordered pagination={{ pageSize: 5 }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default List;
