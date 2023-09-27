import PageNotFound from "../components/PageNotFound"
import Navbar from "../components/navbar/Navbar"
import { Routes, Route } from 'react-router-dom'

import Public from './public/index'
import Private from "./private/index"

import Signup from "../components/Signup"
import Signin from "../components/Signin"
import HomePage from "../pages/HomePage"
import { Profile } from "../services/auth-service"
import { login } from "../redux/authSlice"


import toast from "react-hot-toast"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AllUser from "../components/AllUser"
import AdminProduct from "../components/AdminProduct"
import Products from "../components/Products"


const index: React.FC = () => {
    const dispatch = useDispatch()
    async function profile() {
        Profile().then(res => {
            dispatch(login(res.data.user))
        }).catch(e => toast.error(e?.response?.data.message))
    }
    useEffect(() => {
        profile()
    }, [])
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Private />}>

                    <Route path="/products" element={<Products />} />
                    <Route path="/" element={<HomePage />} >
                        <Route path="/allusers" element={<AllUser />} />
                        <Route path="/admin-products" element={<AdminProduct />} />
                    </Route>
                </Route>

                <Route path="/" element={<Public />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default index
