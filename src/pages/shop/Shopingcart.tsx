import { Drawer, List, Button, Badge, Avatar, message } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ShoppingCartProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cart, setCart }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    message.warning('Đã xóa sản phẩm khỏi giỏ hàng!');
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Tính tổng tiền từ `price * quantity`
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Badge count={cart.reduce((sum, item) => sum + item.quantity, 0)} showZero>
        <Avatar
          size="large"
          icon={<ShoppingCartOutlined />}
          style={{ background: '#f56a00', cursor: 'pointer' }}
          onClick={() => setVisible(true)}
        />
      </Badge>

      <Drawer title="Giỏ hàng" placement="right" onClose={() => setVisible(false)} open={visible} width={350}>
        {cart.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>,
                  <span style={{ minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>,
                  <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>,
                  <Button icon={<DeleteOutlined />} onClick={() => removeFromCart(item.id)} danger />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} size={64} />}
                  title={item.name}
                  description={`${(item.price * item.quantity).toLocaleString()} VNĐ`}
                />
              </List.Item>
            )}
          />
        )}
        <h3>Tổng tiền: {total.toLocaleString()} VNĐ</h3>
        <Button type="primary" block disabled={cart.length === 0} onClick={() => navigate("/checkout")}>
          Thanh toán
        </Button>
      </Drawer>
    </>
  );
};

export default ShoppingCart;
