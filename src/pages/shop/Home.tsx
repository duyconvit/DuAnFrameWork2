import React, { useEffect, useState } from 'react';
import { Layout, Input, Button, Card, Row, Col, message, Carousel, Dropdown, Menu } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCart from "./Shopingcart";
import Footer from './Footer';
import { IProduct } from '@/interface/type';

const { Header, Content } = Layout;
const { Meta } = Card;

interface HomeProps {
  cart: IProduct[];
  setCart: (cart: IProduct[]) => void;
}

const Home = ({ cart, setCart }: HomeProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  // Lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/students');
        setProducts(data);
      } catch (error) {
        console.error(error);
        message.error('Lỗi khi tải danh sách sản phẩm!');
      }
    })();
  }, []);

  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserName(userData.name);
    } else {
      message.warning("Bạn cần đăng nhập để truy cập trang này");
      navigate("/login");
    }
  }, [navigate]);

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserName(null);
    message.success('Bạn đã đăng xuất');
    navigate('/login');
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product: IProduct) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    message.success('Thêm vào giỏ hàng thành công!');
  };

  // Mua ngay (thêm vào giỏ hàng và chuyển đến trang thanh toán)
  const buyNow = (product: IProduct) => {
    const updatedCart = [{ ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    navigate('/checkout');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>📱 PhoneStore</div>
        <Input placeholder="Tìm kiếm sản phẩm..." prefix={<SearchOutlined />} style={{ width: '40%' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ShoppingCart cart={cart} setCart={setCart} />

          {/* Kiểm tra xem đã đăng nhập chưa */}
          {userName ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1" onClick={handleLogout}>Đăng xuất</Menu.Item>
                </Menu>
              }
            >
              <Button type="primary" icon={<UserOutlined />}>{userName}</Button>
            </Dropdown>
          ) : (
            <Link to="/register">
              <Button type="primary" icon={<UserOutlined />}>Đăng Ký</Button>
            </Link>
          )}
        </div>
      </Header>

      {/* Banner quảng cáo */}
      <Carousel autoplay style={{ marginBottom: '20px' }}>
        <div>
          <img src="https://img.pikbest.com/origin/10/01/53/35bpIkbEsTBzN.png!w700wp" alt="Banner 1" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
        </div>
      </Carousel>

      {/* Nội dung chính */}
      <Content style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>🔥 Sản phẩm mới nhất</h2>
        <Row gutter={[16, 16]} justify="center">
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    style={{ width: '100%', height: '200px', objectFit: 'contain', padding: '10px' }}
                  />
                }
                actions={[
                  <Button type="default" onClick={() => addToCart(product)}>🛒 Thêm vào giỏ</Button>,
                  <Button type="primary" onClick={() => buyNow(product)}>⚡ Mua ngay</Button>
                ]}
              >
                <Meta title={product.name} description={`${product.price.toLocaleString("vi-VN")} VNĐ`} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>

      {/* Footer */}
      <Footer />
    </Layout>
  );
};

export default Home;
