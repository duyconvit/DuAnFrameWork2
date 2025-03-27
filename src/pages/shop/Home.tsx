import { Layout, Menu, Input, Button, Card, Row, Col, Avatar, Badge, message, Carousel } from "antd";
import { ShoppingCartOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/students");
        setProducts(data);
      } catch (error) {
        console.error(error);
        message.error("Lỗi khi tải danh sách sản phẩm!");
      }
    })();
  }, []);

  const addToCart = () => {
    setCartCount(cartCount + 1);
    message.success("Thêm vào giỏ hàng thành công!");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
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

      {/* Banner quảng cáo */}
      <Carousel autoplay style={{ marginBottom: "20px" }}>
        <div>
          <img src="https://img.pikbest.com/origin/10/01/53/35bpIkbEsTBzN.png!w700wp" alt="Banner 1" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
        </div>
      </Carousel>

      {/* Nội dung chính */}
      <Content style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>🔥 Sản phẩm mới nhất</h2>
        <Row gutter={[16, 16]} justify="center">
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    style={{
                      width: "100%", // Đảm bảo ảnh vừa khung
                      height: "200px", // Cố định chiều cao
                      objectFit: "contain", // Giữ đúng tỉ lệ ảnh, không bị méo
                      padding: "10px" // Thêm padding tránh ảnh dính sát mép
                    }}
                  />
                }
                actions={[
                  <Button type="primary" onClick={addToCart}>Mua ngay</Button>
                ]}
              >
                <Meta title={product.name} description={`${product.price.toLocaleString()} VNĐ`} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center", background: "#f0f2f5", padding: "20px" }}>
        📞 PhoneStore - Cửa hàng điện thoại uy tín | Hotline: 1900 1234
      </Footer>
    </Layout>
  );
};

export default Home;