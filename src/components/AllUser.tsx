import { useEffect, useState } from "react";
import { ChangeRole, DeleteUser, GetAllUsers } from "../services/auth-service";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineUserDelete } from 'react-icons/ai'
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

const AllUser: React.FC = () => {

    const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false); 
    const [selectedUser, setSelectedUser] = useState<any>(null); 
    const [role, setRole] = useState('');
    const [users, setUsers] = useState([]);
    const [updateRole, setUpdateRole] = useState(false)
    const admin = useSelector((state: any) => state?.auth.user);
    let id = 0

    const handleUpdateUser = (id: any) => {
        ChangeRole(id, role).then((res) => {
            toast.success(res.data.message)
            setIsEditRoleModalOpen(false)
            setUpdateRole(!updateRole)
        }).catch(e => toast.error(e?.response?.data.message))
    }

    const handleDeleteUser = (id: any) => {
        DeleteUser(id).then((res) => {
            toast.success(res.data.message)
            setUpdateRole(!updateRole)
        }).catch(e => toast.error(e?.response?.data.message))
    }

    const openEditRoleModal = (user: any) => {
        setSelectedUser(user);
        setIsEditRoleModalOpen(true);
    };

    // Function to close the modal
    const closeEditRoleModal = () => {
        setIsEditRoleModalOpen(false);
    };


    useEffect(() => {
        GetAllUsers().then((res) => {
            setUsers(res.data.users);
        }).catch(e => toast.error(e?.response?.data.message))
    }, [updateRole]);
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 ">
                <div className="sm:flex sm:items-center ">
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300 ">
                                <thead className="h-[90-vh]">
                                    <tr>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Id
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Role
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {users.filter((usr: any) => usr._id !== admin._id).map((user: any) => (
                                        <tr key={user.email} className="even:bg-gray-50">
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{id += 1}</td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                {user.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>

                                            {admin.role !== 'super' && <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.role}</td>}
                                            {/* ------------------------- */}
                                            {admin.role === 'super' &&
                                                <>
                                                    {<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <div className="flex items-center ">
                                                            <div onClick={() => openEditRoleModal(user)}>
                                                                <AiOutlineEdit />
                                                            </div>
                                                            <span className="ml-1">{user.role}</span>

                                                        </div>
                                                    </td>}
                                                </>
                                            }
                                            {/* ------------------------- */}
                                            {admin.role === 'super' && <td
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                                <AiOutlineUserDelete />
                                            </td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isEditRoleModalOpen}
                onRequestClose={closeEditRoleModal}
                contentLabel="Edit Role Modal"
                style={customStyles}
            >
                {/* Modal content */}
                {selectedUser && (
                    <div className="flex flex-col items-center justify-between" >
                        <p>Edit the role for user: {selectedUser.name}</p>
                        {/* Add your role editing form or select input here */}
                        {/* For example: */}
                        <div >
                            <select
                                name="role"
                                id="role"
                                className="mt-3 mb-1 rounded"
                                defaultValue={selectedUser.role}
                                onChange={(e: any) => {
                                    // Handle role change here
                                    setRole(e.target.value);

                                }}
                            >
                                <option value={selectedUser.role}>{selectedUser.role}</option>
                                {['super', 'buyer', "supplier"].filter(el => el !== selectedUser.role).map(el => <>
                                    <option value={el}>{el}</option>
                                </>)}
                            </select>
                        </div>
                        <div className="mt-3">
                            <button
                                type="button"
                                onClick={() => handleUpdateUser(selectedUser._id)}
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
        </>
    )
}

export default AllUser
