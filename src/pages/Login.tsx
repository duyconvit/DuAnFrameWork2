import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Input, Button, Typography, Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      message.info(`Chào mừng trở lại, ${JSON.parse(user).name}!`);
      navigate('/'); // Nếu đã đăng nhập, tự động chuyển hướng
    }
  }, [navigate]);

  const onSubmit = async (user: LoginFormInputs) => {
    try {
      const { data } = await axios.post('http://localhost:4000/login', user);

      if (data.accessToken) {
        localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, token: data.accessToken }));
        message.success(`Đăng nhập thành công! Chào mừng, ${data.name}!`);
        navigate('/');
      } else {
        throw new Error('Lỗi xác thực');
      }
    } catch (error) {
      console.error(error);
      message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Đăng nhập</Title>
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          
          {/* Email */}
          <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Vui lòng nhập email', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không hợp lệ' } }}
              render={({ field }) => <Input {...field} prefix={<UserOutlined />} placeholder="Email" />}
            />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item label="Mật khẩu" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Vui lòng nhập mật khẩu', minLength: { value: 6, message: 'Mật khẩu ít nhất 6 ký tự' } }}
              render={({ field }) => <Input.Password {...field} prefix={<LockOutlined />} placeholder="Mật khẩu" />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Text>
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </Text>
      </Card>
    </div>
  );
};

export default Login;
