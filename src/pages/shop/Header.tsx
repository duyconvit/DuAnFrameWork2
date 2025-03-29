import { Layout, Input, Badge, Avatar, Button } from "antd";
import { ShoppingCartOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const CustomHeader = ({ cartCount }) => {
  return (
    <Header style={{ background: "#fff", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1890ff" }}>📱 PhoneStore</div>
      <Input placeholder="Tìm kiếm sản phẩm..." prefix={<SearchOutlined />} style={{ width: "40%" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Badge count={cartCount} showZero>
          <Avatar size="large" icon={<ShoppingCartOutlined />} style={{ background: "#f56a00", cursor: "pointer" }} />
        </Badge>
        <Button type="primary" icon={<UserOutlined />}>Đăng nhập</Button>
      </div>
    </Header>
  );
};

export default CustomHeader;
