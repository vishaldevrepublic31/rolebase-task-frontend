import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
const index: React.FC = () => {
    const navigate = useNavigate()
    const [checkedLogin, setCheckedLogin] = useState<string | null>("");
    const token = localStorage.getItem('auth')
    useEffect(() => {
        if (token) {
            setCheckedLogin(token)
        }
    })
    return (
        <div>
            {checkedLogin ? <>{navigate('/')} </> : <Outlet />}
        </div>
    )
}

export default index
