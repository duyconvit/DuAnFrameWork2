import { useRoutes } from "react-router-dom";
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



function App() {
  const routes = useRoutes([
    {path:'/', element:<Home/>},
    {path:'/checkout', element:<Checkout/>},
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
