import { Button, Form, Input, Typography, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      // Tìm người dùng theo email
      const res = await axios.get(`http://localhost:4000/users?email=${values.email}`);
      
      if (res.data.length === 1) {
        const user = res.data[0];
  
        // So sánh mật khẩu người dùng nhập với hash trong db
        const isMatch = await bcrypt.compare(values.password, user.password);
  
        if (!isMatch) {
          message.error("Sai mật khẩu");
          return;
        }
  
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("user", JSON.stringify({
          name: user.name,
          email: user.email,
          
        }));
  
        message.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        message.error("Email không tồn tại");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      message.error("Lỗi khi đăng nhập");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <Title level={2}>Đăng nhập</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập email" }, { type: "email", message: "Email không hợp lệ" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>

        {/* Nút Đăng ký chuyển hướng đến trang đăng ký */}
        <Form.Item>
          <Button type="default" block onClick={() => navigate("/register")}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;