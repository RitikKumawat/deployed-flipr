import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css"
import { Home } from "./pages/Home";
import { useSelector } from "react-redux";
import { PrivateRoute } from "./components/PrivateRoute";
import Databases from "./pages/Databases";
import { User } from "./pages/User";



function App() {
  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.auth);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={token!==null && user.role=="admin" ? <Home/> : <Login/>}/>
        <Route path="/databases" element={<PrivateRoute><Databases/></PrivateRoute>}/>
      </Routes>
    </>
  );
}

export default App;
