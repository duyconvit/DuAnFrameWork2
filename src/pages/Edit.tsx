import { ProductForm } from '@/interface/type'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Edit = () => {
  const {register,handleSubmit,reset, formState:{errors}} = useForm<ProductForm>()
  const params = useParams()
  useEffect(()=>{
    (async()=>{
try {
  const {data} = await axios.get(`http://localhost:4000/students/${params.id}`)
  reset(data)
} catch (error) {
  console.log(error)
}
    })()
  },[])
  const navigate = useNavigate()
  const onSubmit = async (product:ProductForm)=>
  {
    try {
      const {data} = await axios.put(`http://localhost:4000/students/${params.id}`,product)
      alert('Cập nhật sản phẩm thành công ')
      navigate(`/students`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" collapsible>
        <div className="logo" style={{ color: 'white', textAlign: 'center', padding: '20px' }}>Admin Panel</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
            <Link to="/students">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/students">Đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<OrderedListOutlined />}>
            <Link to="/admin/reports">Khách hàng</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<EditOutlined />}>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: 0, textAlign: 'center', fontSize: '18px' }}>
          Cập nhật sản phẩm
        </Header>

        <Content style={{ margin: '20px', display: 'flex', justifyContent: 'center' }}>
          <Card title="Cập nhật sản phẩm" bordered className="w-full max-w-lg shadow-lg">
            <Form form={form} layout="vertical" onFinish={onFinish}>

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
                <Input placeholder="Nhập URL ảnh sản phẩm" onChange={(e) => setImageUrl(e.target.value)} />
                {imageUrl && <img src={imageUrl} alt="Ảnh sản phẩm" style={{ marginTop: 10, maxWidth: '100%', height: '150px', objectFit: 'cover' }} />}
              </Form.Item>
  )
}

export default Edit
