import { useRoutes } from "react-router-dom";
import "./App.css";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerList from "./pages/KhachHangList";

function App() {
  const routes = useRoutes([
    {path:'/students', element:<List/>},
    {path:'/students/add', element:<Add/>},
    {path:'/students/:id', element:<Edit/>},
    {path:'/login', element:<Login/>},
    {path:'/register', element:<Register/>},
    {path:'/customers',element:<CustomerList/>},
    
  ])
  return routes
}

export default App;
