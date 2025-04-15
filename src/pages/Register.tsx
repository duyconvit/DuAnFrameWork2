import { Button, Form, Input, Typography, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const { Title } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      // Kiểm tra email đã tồn tại chưa
      const check = await axios.get(`http://localhost:4000/users?email=${values.email}`);
      if (check.data.length > 0) {
        return message.error("Email đã tồn tại!");
      }

      // Hash mật khẩu với salt rounds = 10
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(values.password, salt);

      const newUser = {
        name: values.name,
        email: values.email,
        password: hashedPassword,
        
      };

      // Lưu người dùng mới vào database
      await axios.post("http://localhost:4000/users", newUser);
      message.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      message.error("Đã có lỗi khi đăng ký");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <Title level={2}>Đăng ký</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Tên" name="name" rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập email" }, { type: "email", message: "Email không hợp lệ" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;