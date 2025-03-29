import { useEffect, useState } from "react";
import { Layout, Card, List, Input, Button, message, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const { Header, Content } = Layout;

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Checkout = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (values: any) => {
    message.success("Thanh toán thành công! Đơn hàng đang được xử lý.");
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header style={{ background: "#fff", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1890ff", cursor: "pointer" }} onClick={() => navigate("/")}>📱 PhoneStore</div>
      </Header>

      <Content style={{ maxWidth: 600, margin: "auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>🛒 Xác nhận Thanh Toán</h2>

        <Card title="Thông tin giỏ hàng">
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <img src={item.image} alt={item.name} style={{ width: 50, marginRight: 10 }} />
                <div style={{ flex: 1 }}>
                  <h4>{item.name} (x{item.quantity})</h4>
                  <p>{(item.price * item.quantity).toLocaleString()} VNĐ</p>
                </div>
              </List.Item>
            )}
          />
          <h3>Tổng tiền: {total.toLocaleString()} VNĐ</h3>
        </Card>

        <Card title="Thông tin giao hàng" style={{ marginTop: 20 }}>
          <Form layout="vertical" onFinish={handleCheckout}>
            <Form.Item label="Họ và tên" name="name" rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}>
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
              <Input.TextArea placeholder="Nhập địa chỉ giao hàng" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block disabled={cart.length === 0}>
              Xác nhận Thanh Toán
            </Button>
          </Form>
        </Card>
      </Content>

      {/* Footer */}
      <Footer />
    </Layout>
  );
};

export default Checkout;
