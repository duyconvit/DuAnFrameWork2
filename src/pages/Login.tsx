import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Card, Input, Button, Typography, Form, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      message.info(`Chào mừng trở lại, ${JSON.parse(user).name}!`);
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (user: LoginFormInputs) => {
    try {
      const { data } = await axios.post("http://localhost:4000/login", user);

      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify({
          name: data.name,
          email: data.email,
          token: data.accessToken
        }));
        message.success(`Đăng nhập thành công! Chào mừng, ${data.name}!`);
        navigate("/");
      } else {
        throw new Error("Lỗi xác thực");
      }
    } catch (error) {
      message.error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0f7fa, #80deea)"
    }}>
      <Card style={{ width: 400, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", borderRadius: 12 }}>
        <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>🔐 Đăng nhập</Title>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email không hợp lệ"
                }
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Email" prefix={<UserOutlined />} />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu ít nhất 6 ký tự"
                }
              }}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Mật khẩu" prefix={<LockOutlined />} />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Text type="secondary">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </Text>
      </Card>
    </div>
  );
};

export default Login;
