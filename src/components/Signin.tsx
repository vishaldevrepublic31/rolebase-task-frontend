import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { LoginSchemas } from '../schemas/LoginSchemas';
import { LoginUser } from '../services/auth-service';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
const Signin: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: LoginSchemas,
        onSubmit: async (values) => {
            const { email, password } = values
            const data = {
                email,
                password
            }
            LoginUser(data).then(res => {
                toast.success(res.data.message)
                dispatch(login(res.data.user))
                localStorage.setItem('auth', res.data.token)
                navigate('/')
            }).catch(e => toast.error(e?.response?.data.message))
        },
    });
    return (
        <>
            <div className="flex  flex-1 h-[91.5vh] p-10 ">

                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
                <div className="flex flex-1 flex-col mt-20 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>

                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>

                        </div>

                        <div className="mt-10">
                            <div>
                                <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                                            {formik.errors.email && formik.touched.email ? <p className="text-red-500">{formik.errors.email}</p> : null}
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
                                            {formik.errors.password && formik.touched.password ? <p className="text-red-500">{formik.errors.password}</p> : null}
                                        </div>
                                    </div>



                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign in
                                        </button>

                                    </div>
                                </form>
                            </div>
                            <div className='mt-3'>
                                <Link to='/signup' >Not Registered? <span className='me-1 text-blue-500'> Sign up</span>Here</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin
