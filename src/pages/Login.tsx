import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Input, Button, Typography, Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

// Định nghĩa interface cho dữ liệu form đăng nhập
interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  // Xác định kiểu dữ liệu cho hàm onSubmit
  const onSubmit: SubmitHandler<LoginFormInputs> = async (user) => {
    try {
      await axios.post('http://localhost:4000/login', user);
      message.success('Đăng nhập thành công');
      navigate('/students');
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
          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email ? 'Vui lòng nhập đúng định dạng email' : ''}
          >
            <Input
              {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password ? 'Mật khẩu phải có ít nhất 6 ký tự' : ''}
          >
            <Input.Password
              {...register('password', { required: true, minLength: 6 })}
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
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