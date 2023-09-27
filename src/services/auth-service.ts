import axios from 'axios'
import { ILogin, IRegister } from '../interfaces'

const URL = 'http://localhost:5000/api/v1/user/'

const token = localStorage.getItem('auth')
export const RegisterUser = async (data: IRegister) => {
    return await axios.post(`${URL}register`, data)
}

export const LoginUser = async (data: ILogin) => {
    return await axios.post(`${URL}login`, data)
}

export const Profile = async () => {
    return await axios.get(`${URL}me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

export const ProductAddToCart = async (id: string) => {
    console.log(token);
    console.log("id=>", id);
    return await axios.post(`${URL}addcart/${id}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

export const RemoveProduct = async (id: any) => {
    return await axios.post(`${URL}removeProduct/${id}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

export const GetAllUsers = async () => {
    return await axios.get(`${URL}users`)
}

export const ChangeRole = async (id: any, role: any) => {
    return await axios.put(`${URL}change-role/${id}`, { role }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

export const DeleteUser = async (id: any) => {
    return await axios.delete(`${URL}delete/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}