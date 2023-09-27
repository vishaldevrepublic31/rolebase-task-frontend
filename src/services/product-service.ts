import axios from 'axios'

const URL = 'http://localhost:5000/api/v1/product/'

const token = localStorage.getItem('auth')

export const GetAllProducts = async () => {
    return await axios.get(`${URL}`)
}

export const DeleteProduct = async (id: string) => {
    return await axios.delete(`${URL}delete-product/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

export const EditProduct = async (id: string, data: any) => {
    return await axios.put(`${URL}update-product/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}
export const AddProduct = async (data: any) => {
    return await axios.post(`${URL}create`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}