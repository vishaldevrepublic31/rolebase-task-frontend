import { useEffect, useState } from "react"
import { GetAllProducts } from "../services/product-service"
import toast from "react-hot-toast";
import { ProductAddToCart, Profile } from "../services/auth-service";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
const Products: React.FC = () => {
    const [products, setProducts] = useState<any>([]);
    const [addCart, setAddCart] = useState<boolean>(false)
    const dispatch = useDispatch()
    const handleAddCartProduct = (id: string) => {
        ProductAddToCart(id)
            .then((res: any) => {
                toast.success(res.data.message)
                setAddCart(!addCart)
            }).catch(e => toast.error(e?.response?.data.message))
    }

    async function profile() {
        Profile().then(res => {
            dispatch(login(res.data.user))
        }).catch(e => toast.error(e?.response?.data.message))
    }
    useEffect(() => {
        profile()
    }, [addCart])

    useEffect(() => {
        GetAllProducts().then(res => {
            setProducts(res.data.products)

        }).catch(e => toast.error(e.response.data.message))
    }, [])

    return (
        <>
            <div className="flex ml-40 mr-40 mt-10 flex-wrap">
                {products.map((product: any) => <div className="bg-slate-100  drop-shadow-xl w-72 h-72 m-2 relative hover:bg-white transition-all cursor-pointer rounded shadow-sm overflow-auto">
                    <div className="p-2">
                        <img className="w-full h-32  rounded " src="https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg" alt="a" />
                        <span className="font-semibold">{product.title}</span>
                        <h1>Description:</h1>
                        <p className="text-slate-500">{product.description}</p>
                        <p className=" text-green-800"><b>₹{product.price}</b></p>
                        <button
                            onClick={() => handleAddCartProduct(product._id)}
                            type="button"
                            className="mt-5 absolute bottom-2 right-3 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>)}


            </div>
        </>
    )
}

export default Products
