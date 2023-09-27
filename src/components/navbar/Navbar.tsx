import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/authSlice";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Profile, RemoveProduct } from "../../services/auth-service";
import toast from "react-hot-toast";
const navigation = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/products" },
];

const Navbar: React.FC = () => {
    const { user } = useSelector((state: any) => state?.auth);
    const { cart } = useSelector((state: any) => state?.auth);
    const [remove, setRemove] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('auth')
    }

    const handleRemove = (id: any) => {
        RemoveProduct(id).then((res) => {
            toast.success(res.data.message)
            setRemove(!remove)
        }).catch(e => toast.error(e?.response?.data.message))
    }

    async function profile() {
        Profile().then(res => {
            dispatch(login(res.data.user))
        }).catch(e => toast.error(e?.response?.data.message))
    }
    useEffect(() => {
        profile()
    }, [remove])

    return (
        <header className="bg-white">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <Link to="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                    />
                </Link>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.to}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                    {!user && (
                        <>
                            <Link
                                to="/signup"
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Sign up
                            </Link>
                            <Link
                                to="/signin"
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Sign in
                            </Link>
                        </>
                    )}

                    {user &&
                        <button
                        >
                            <Link to='/'
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                {user.name}
                            </Link>
                        </button>
                    }

                    {user &&
                        <button
                            onClick={handleLogout}
                        >
                            <Link
                                to="/signin"
                                className="text-sm font-semibold leading-6 text-gray-900"
                            >
                                Logout
                            </Link>
                        </button>
                    }


                    {/* Cart */}
                    {user && user.cart && user.cart.length > 0 && (
                        <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
                            <Popover.Button className="group -m-2 flex items-center p-2">
                                <ShoppingBagIcon
                                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart !== 'null' && cart}</span>
                                <span className="sr-only">items in cart, view bag</span>
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Popover.Panel className="absolute z-10 inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                                    <h2 className="sr-only">Shopping Cart</h2>

                                    <form className="mx-auto max-w-2xl px-4">
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {user.cart.map((product: any) => (
                                                <li key={product._id} className="flex items-center py-6">

                                                    <img
                                                        src='https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg'
                                                        alt='a'
                                                        className="h-16 w-16 flex-none rounded-md border border-gray-200"
                                                    />
                                                    <div className="ml-4 flex-auto">
                                                        <h3 className="font-medium text-gray-900">
                                                            <p>{product.title}</p>
                                                        </h3>
                                                        <p className="text-gray-500">{product.description}</p>
                                                        <p className="text-gray-500"><b>₹ {product.price}</b></p>
                                                    </div>

                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemove(product._id)}
                                                            className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            type="submit"
                                            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                        >
                                            Checkout
                                        </button>

                                        {/* <p className="mt-6 text-center">
                                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                View Shopping Bag
                                            </a>
                                        </p> */}
                                    </form>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    )}
                </div>
            </nav>
            <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                {!user && <>

                                    <Link
                                        to="/signup"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Sign up
                                    </Link>
                                    <Link
                                        to="/signin"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Sign in
                                    </Link>
                                </>}
                                {user && <>

                                    <Link
                                        to="/"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 hover:text-cyan-500  text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {user.name}
                                    </Link>
                                    <Link
                                        to="/signin"
                                        onClick={handleLogout}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Logout
                                    </Link>
                                </>}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default Navbar;
