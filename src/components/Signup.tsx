import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { RegisterSchemas } from '../schemas/RegisterSchemas'
import { RegisterUser } from '../services/auth-service';
import toast from 'react-hot-toast';
const Signup: React.FC = () => {

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            cpassword: ""
        },
        validationSchema: RegisterSchemas,
        onSubmit: async (values) => {
            const { name, email, password } = values
            const data = {
                name,
                email,
                password
            }
            RegisterUser(data).then(res => {
                toast.success(res.data?.message);
                navigate("/signin");
            }).catch(e => toast.error(e?.response?.data.message))
        },
    });
    return (
        <>
            <div className="flex  flex-1 h-[91.5vh] p-10 ">
                <div className="flex flex-1 flex-col mt-5 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>

                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign up to your account
                            </h2>

                        </div>

                        <div className="mt-10">
                            <div>
                                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {formik.errors.name && formik.touched.name ? (
                                                <p className="text-red-500">{formik.errors.name}</p>
                                            ) : null}
                                        </div>
                                    </div>


                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {formik.errors.email && formik.touched.email ? (
                                                <p className="text-red-500">{formik.errors.email}</p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {formik.errors.password && formik.touched.password ? (
                                                <p className="text-red-500">{formik.errors.password}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">
                                            Confirm Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="cpassword"
                                                name="cpassword"
                                                type="password"
                                                value={formik.values.cpassword}
                                                onChange={formik.handleChange}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {formik.errors.cpassword && formik.touched.cpassword ? (
                                                <p className="text-red-500">{formik.errors.cpassword}</p>
                                            ) : null}
                                        </div>
                                    </div>



                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign Up
                                        </button>

                                    </div>
                                </form>
                            </div>
                            <div className='mt-3'>
                                <Link to='/signin' >Already Registered? <span className='me-1 text-blue-500'> Sign in</span>Here</Link>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}

export default Signup
