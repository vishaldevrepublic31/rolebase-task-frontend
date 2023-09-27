

import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link, Outlet } from 'react-router-dom'

const navigation = [
    { name: 'Dashboard', to: '/', current: true },
    { name: 'Users', to: 'allusers', current: false },
    { name: 'Products', to: 'admin-products', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const AdminDashboard: React.FC = () => {
    return (
        <>

            <div className='flex '>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 w-72 h-[91vh]">
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item: any) => (
                                        <li key={item.name}>
                                            {!item.children ? (
                                                <Link
                                                    to={item.to}
                                                    className={classNames(
                                                        item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                                        'block rounded-md py-2 pr-2 pl-10 text-sm leading-6 font-semibold text-gray-700'
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ) : (
                                                <Disclosure as="div">
                                                    {({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className={classNames(
                                                                    item.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                                                    'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                                                                )}
                                                            >
                                                                <ChevronRightIcon
                                                                    className={classNames(
                                                                        open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                                                        'h-5 w-5 shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                                {item.children.map((subItem: any) => (
                                                                    <li key={subItem.name}>
                                                                        <Disclosure.Button
                                                                            as="a"
                                                                            href={subItem.href}
                                                                            className={classNames(
                                                                                subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                                                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
                                                                            )}
                                                                        >
                                                                            {subItem.name}
                                                                        </Disclosure.Button>
                                                                    </li>
                                                                ))}
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='w-full  m-2 mr-20'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AdminDashboard
