import { Layout, Row, Col, Typography, Space } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ background: "#f0f2f5", padding: "40px 20px" }}>
      <Row gutter={[16, 16]} justify="center">
        {/* Giới thiệu về cửa hàng */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Title level={4}>📱 PhoneStore</Title>
          <Text>
            PhoneStore là cửa hàng chuyên cung cấp các sản phẩm điện thoại chất
            lượng cao với giá cả hợp lý. Sự hài lòng của khách hàng là ưu tiên
            hàng đầu của chúng tôi.
          </Text>
        </Col>

        {/* Liên kết nhanh */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Title level={4}>Liên kết nhanh</Title>
          <Space direction="vertical">
            <a href="/about">Giới thiệu</a>
            <a href="/products">Sản phẩm</a>
            <a href="/news">Tin tức</a>
            <a href="/contact">Liên hệ</a>
          </Space>
        </Col>

        {/* Thông tin liên hệ */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Title level={4}>Thông tin liên hệ</Title>
          <Space direction="vertical">
            <Text>Địa chỉ: 13 Trịnh Văn Bô, Quận Nam Từ Liêm, TP.HN</Text>
            <Text>Hotline: 1900 1234</Text>
            <Text>Email: support@phonestore.vn</Text>
          </Space>
        </Col>

        {/* Liên kết mạng xã hội */}
        <Col xs={24} sm={12} md={8} lg={6}>
          <Title level={4}>Kết nối với chúng tôi</Title>
          <Space>
            <a href="https://facebook.com/phonestore" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ fontSize: "24px" }} />
            </a>
            <a href="https://instagram.com/phonestore" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: "24px" }} />
            </a>
            <a href="https://twitter.com/phonestore" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: "24px" }} />
            </a>
            <a href="https://youtube.com/phonestore" target="_blank" rel="noopener noreferrer">
              <YoutubeOutlined style={{ fontSize: "24px" }} />
            </a>
          </Space>
        </Col>
      </Row>

      {/* Bản quyền và chứng nhận */}
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Text style={{ textAlign: "center" }}>
          © {new Date().getFullYear()} PhoneStore. All rights reserved.
        </Text>
      </Row>
    </Footer>
  );
};

export default AppFooter;