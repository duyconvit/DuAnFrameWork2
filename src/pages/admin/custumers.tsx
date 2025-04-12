// import { useEffect, useState } from "react";
// import { Table, Layout, Menu, Avatar, Space, Button, message } from "antd";
// import { UserOutlined, ShoppingCartOutlined, BarChartOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const { Header, Sider, Content } = Layout;

// interface Customer {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string;
// }

// const Customers = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get("http://localhost:4000/customers");
//         setCustomers(data);
//       } catch (error) {
//         console.error(error);
//         message.error("Lỗi khi lấy danh sách khách hàng!");
//       }
//     })();
//   }, []);

//   const deleteCustomer = async (id: number) => {
//     try {
//       await axios.delete(`http://localhost:4000/customers/${id}`);
//       setCustomers(customers.filter((customer) => customer.id !== id));
//       message.success("Xóa khách hàng thành công!");
//     } catch (error) {
//       console.error(error);
//       message.error("Lỗi khi xóa khách hàng!");
//     }
//   };

//   const columns = [
//     { title: "STT", dataIndex: "index", key: "index", render: (_: unknown, __: unknown, index: number) => index + 1 },
//     { title: "Ảnh", dataIndex: "avatar", key: "avatar", render: (avatar: string) => <Avatar src={avatar} /> },
//     { title: "Tên", dataIndex: "name", key: "name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     {
//       title: "Hành động",
//       key: "action",
//       render: (_: unknown, record: Customer) => (
//         <Space>
//           <Button danger onClick={() => deleteCustomer(record.id)}>Xóa</Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider theme="dark" collapsible>
//         <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px" }}>Admin Panel</div>
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
//           <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
//             <Link to="/admin/products">Sản phẩm</Link>
//           </Menu.Item>
//           <Menu.Item key="2" icon={<UserOutlined />}>
//             <Link to="/admin/customers">Khách hàng</Link>
//           </Menu.Item>
//           <Menu.Item key="3" icon={<BarChartOutlined />}>
//             <Link to="/admin/reports">Thống kê</Link>
//           </Menu.Item>
//         </Menu>
//       </Sider>

//       <Layout>
//         <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "18px" }}>
//           Danh sách khách hàng
//         </Header>
//         <Content style={{ margin: "16px" }}>
//           <Table columns={columns} dataSource={customers} rowKey="id" bordered pagination={{ pageSize: 20 }} />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Customers;
