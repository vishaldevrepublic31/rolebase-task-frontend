import { useEffect, useState } from "react";
import { AddProduct, DeleteProduct, EditProduct, GetAllProducts } from "../services/product-service";
import toast from "react-hot-toast";
import { MdOutlineDeleteSweep } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import Modal from "react-modal"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const AdminProduct: React.FC = () => {
    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
    const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);


    const [products, setProducts] = useState<any>([]);
    const [updatePage, setUpdatePage] = useState(false)
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [addProduct, setAddProduct] = useState(false)
    const [title, setTitle] = useState('')

    const handleAddProduct = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const data = {
            title,
            description,
            price
        }
        AddProduct(data)
            .then(res => {
                toast.success(res.data.message)
                setUpdatePage(!updatePage)
            })
            .catch(e => toast.error(e?.response?.data.message))
        setIsAddRoleModalOpen(false)
    }

    const handleProductDelete = (id: string) => {
        DeleteProduct(id).then((res) => {
            toast.success(res.data.message)
            setUpdatePage(!updatePage)
        }).catch(e => toast.error(e?.response?.data.message))
    }

    const handleaAddProduct = () => {
        setIsAddRoleModalOpen(true);
        setAddProduct(true)
    }

    const handleUpdateProduct = (id: any) => {
        const data = {
            title,
            description,
            price
        }
        EditProduct(id, data).then((res) => {
            toast.success(res.data.message)
            setUpdatePage(!updatePage)
        }).catch(e => toast.error(e?.response?.data.message))
        setIsEditRoleModalOpen(false)
    }

    const openEditRoleModal = (product: any) => {
        setSelectedProduct(product);
        setIsEditRoleModalOpen(true);
    };

    // Function to close the modal
    const closeEditRoleModal = () => {
        setIsEditRoleModalOpen(false);
        setIsAddRoleModalOpen(false)
    };

    useEffect(() => {
        GetAllProducts().then(res => {
            setProducts(res.data.products)
        }).catch(e => toast.error(e.response.data.message))
    }, [updatePage])
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 m-10">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Products</h1>
                        {/* <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email and role.
                        </p> */}
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            onClick={handleaAddProduct}
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Price
                                        </th>

                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {products.map((product: any) => (
                                        <tr key={product.email} className="even:bg-gray-50">
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                {product.title}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.description}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                <div>
                                                    <button onClick={() => {
                                                        openEditRoleModal(product)
                                                        setDescription(product.description)
                                                        setTitle(product.title)
                                                        setPrice(product.price)
                                                    }
                                                    } className="me-3 text-xl"><FiEdit /></button>
                                                    <button onClick={() => handleProductDelete(product._id)} className="text-2xl"><MdOutlineDeleteSweep /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isEditRoleModalOpen}
                onRequestClose={closeEditRoleModal}
                contentLabel="Edit Role Modal"
                style={customStyles}
            >
                {/* Modal content */}
                {selectedProduct && (
                    <div className="flex flex-col items-center justify-between" >
                        <p>Edit theProduct: {selectedProduct.title}</p>

                        <input className="mt-2 w-96 rounded-md shadow" onChange={(e) => setTitle(e.target.value)} type="text" placeholder={selectedProduct.title} value={title} />
                        <input className="mt-2 w-96 rounded-md shadow" onChange={(e) => setDescription(e.target.value)} type="text" placeholder={selectedProduct.description} value={description} />
                        <input className="mt-2 w-96 rounded-md shadow" onChange={(e) => setPrice(e.target.value)} type="number" placeholder={selectedProduct.price} value={price} />

                        <div className="mt-3">
                            <button
                                type="button"
                                onClick={() => handleUpdateProduct(selectedProduct._id)}
                                className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={closeEditRoleModal}
                                className="rounded ms-2 bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Close
                            </button>

                        </div>
                    </div>
                )}
            </Modal>


            <Modal
                isOpen={isAddRoleModalOpen}
                onRequestClose={closeEditRoleModal}
                contentLabel="Edit Role Modal"
                style={customStyles}
            >
                {/* Modal content */}
                {addProduct && (
                    <form action="">
                        <div className="flex flex-col items-center justify-between" >
                            <p>Add Product: </p>
                            <div>
                                <label className="me-2 mt-2" htmlFor="title">Title</label><br />
                                <input id="title" className=" w-72 rounded-md shadow p-1" onChange={(e) => setTitle(e.target.value)} type="text" required />
                            </div>
                            <div>
                                <label className="me-2 mt-2" htmlFor="description">description</label><br />
                                <input id="description" className=" w-72 rounded-md shadow p-1" onChange={(e) => setDescription(e.target.value)} type="text" required />
                            </div>
                            <div>
                                <label className="me-2 mt-2" htmlFor="price">Price</label><br />
                                <input id='price' className=" w-72 rounded-md shadow p-1" onChange={(e) => setPrice(e.target.value)} type="number" required />
                            </div>

                            <div className="mt-3">
                                <button
                                    type="submit"
                                    onClick={handleAddProduct}
                                    className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    ADD
                                </button>
                                <button
                                    type="button"
                                    onClick={closeEditRoleModal}
                                    className="rounded ms-2 bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    Close
                                </button>

                            </div>
                        </div>
                    </form>
                )}
            </Modal>

        </>
    )
}

export default AdminProduct
