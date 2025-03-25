import { ProductForm } from '@/interface/type';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Upload, message, Layout, Card} from 'antd';
import { UploadOutlined, ShoppingCartOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
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

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(imageUrl);
      message.success('Tải ảnh lên thành công!');
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
          <Menu.Item key="2" icon={<UserOutlined/>}>
            <Link to="/customers">Khách hàng</Link>
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

              <Form.Item label="Ảnh sản phẩm">
                <Upload
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                  onChange={handleUpload}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
                {imageUrl && <img src={imageUrl} alt="Ảnh sản phẩm" className="mt-3 max-w-full h-32" />}
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
