import { useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/shop/Home";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/shop/Checkout";
import CustomerList from "./pages/KhachHang";
import OrderManagement from "./pages/DonHang";
import { IProduct } from "./interface/type";

function App() {
  const [cart, setCart] = useState<IProduct[]>([]);

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage khi component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const routes = useRoutes([
    {path:'/', element:<Home cart={cart} setCart={setCart}/>},
    {path:'/checkout', element:<Checkout cart={cart} setCart={setCart}/>},
    {path:'/products', element:<List/>},
    {path:'/products/add', element:<Add/>},
    {path:'/products/:id', element:<Edit/>},
    {path:'/login', element:<Login/>},
    {path:'/register', element:<Register/>},
    {path:'/customers',element:<CustomerList/>},
    { path: '/orders', element: <OrderManagement /> }
  ])
  return routes
}

export default App;
