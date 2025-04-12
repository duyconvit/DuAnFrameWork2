// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Layout, Descriptions, Image, message } from 'antd';

// const { Content } = Layout;

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
// }

// const ProductDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const [product, setProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:4000/students/${id}`);
//         setProduct(data);
//       } catch (error) {
//         console.error(error);
//         message.error('Lỗi khi tải thông tin sản phẩm!');
//       }
//     })();
//   }, [id]);

//   if (!product) {
//     return <div>Đang tải...</div>;
//   }

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Content style={{ padding: '20px' }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Image
//             width={300}
//             src={product.image}
//             alt={product.name}
//             style={{ marginRight: '20px' }}
//           />
//           <Descriptions title={product.name} bordered>
//             <Descriptions.Item label="Giá">
//               {product.price.toLocaleString()} VNĐ
//             </Descriptions.Item>
//             <Descriptions.Item label="Mô tả">
//               {product.description}
//             </Descriptions.Item>
//           </Descriptions>
//         </div>
//       </Content>
//     </Layout>
//   );
// };

// export default ProductDetail;