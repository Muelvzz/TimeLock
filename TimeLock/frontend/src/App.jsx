import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Sign_up from "./pages/Sign_up";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App(){
    return <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sign-up' element={<Sign_up />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
}