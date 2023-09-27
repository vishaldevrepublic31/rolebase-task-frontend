import { useSelector } from "react-redux";
import Products from "../components/Products"
import AdminDashboard from "../components/AdminDashboard";
;

function HomePage() {
    const { user } = useSelector((state: any) => state?.auth);
    if (user && user.role === 'buyer') {
        return <div>
            <Products />
        </div>
    }
    return (
        <div>
            <AdminDashboard />
        </div>
    )
}

export default HomePage
