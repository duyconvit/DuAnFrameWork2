import { ProductForm } from '@/interface/type';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Layout, Card } from 'antd';
import { ShoppingCartOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const Add = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFinish = async (values: ProductForm) => {
    try {
      const newProduct = { ...values, image: imageUrl };
      await axios.post('http://localhost:4000/students', newProduct);
      message.success('Thêm sản phẩm thành công!');
      navigate('/students');
    } catch (error) {
      console.error(error);
      message.error('Lỗi khi thêm sản phẩm!');
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider theme="dark" collapsible>
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px" }}>Admin Panel</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
            <Link to="/admin/products">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/admin/customers">Khách hàng</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BarChartOutlined />}>
            <Link to="/admin/reports">Thống kê</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Nội dung chính */}
      <Layout>
        <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "18px" }}>
          Thêm sản phẩm
        </Header>

        <Content style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
          <Card title="Thêm sản phẩm" bordered className="w-full max-w-lg shadow-lg">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item label="Giá tiền" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                <Input type="number" placeholder="Nhập giá sản phẩm" />
              </Form.Item>

              <Form.Item label="Mô tả" name="description">
                <Input.TextArea rows={3} placeholder="Nhập mô tả sản phẩm" />
              </Form.Item>

              <Form.Item label="URL Ảnh sản phẩm">
                <Input 
                  placeholder="Nhập URL ảnh sản phẩm" 
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {imageUrl && <img src={imageUrl} alt="Ảnh sản phẩm" style={{ marginTop: 10, maxWidth: "100%", height: "150px", objectFit: "cover" }} />}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Thêm sản phẩm
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Add;
