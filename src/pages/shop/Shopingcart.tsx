import { Drawer, List, Button, Badge, Avatar, message } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '@/interface/type';

interface ShoppingCartProps {
  cart: IProduct[];
  setCart: (cart: IProduct[]) => void;
}

interface CartItem extends IProduct {
  quantity: number;
}

const ShoppingCart = ({ cart, setCart }: ShoppingCartProps) => {
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      setCart(parsedCart);
    }
  }, []);

  const handleQuantityChange = async (productId: string | number, value: number) => {
    try {
      const updatedCart = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: value } : item
      );
      setCartItems(updatedCart);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
      message.error("Có lỗi xảy ra khi cập nhật số lượng");
    }
  };

  const handleRemoveItem = async (productId: string | number) => {
    try {
      const updatedCart = cartItems.filter((item) => item.id !== productId);
      setCartItems(updatedCart);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      message.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      message.error("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <>
      <Badge count={cartItems.reduce((sum, item) => sum + item.quantity, 0)} showZero>
        <Avatar
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={() => setVisible(true)}
          style={{ cursor: 'pointer' }}
        />
      </Badge>

      <Drawer title="Giỏ hàng" placement="right" onClose={() => setVisible(false)} open={visible} width={350}>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống.</p>
        ) : (
          <List
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}>-</Button>,
                  <span style={{ minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>,
                  <Button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>,
                  <Button icon={<DeleteOutlined />} onClick={() => handleRemoveItem(item.id)} danger />,
                ]}
              >
                <List.Item.Meta
                  avatar={<img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover' }} />}
                  title={item.name}
                  description={`${Number(item.price).toLocaleString()} VNĐ`}
                />
              </List.Item>
            )}
          />
        )}
        <h3>Tổng tiền: {total.toLocaleString()} VNĐ</h3>
        <Button type="primary" block disabled={cartItems.length === 0} onClick={() => navigate("/checkout")}>
          Thanh toán
        </Button>
      </Drawer>
    </>
  );
};

export default ShoppingCart;
