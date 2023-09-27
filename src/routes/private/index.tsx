import { useEffect, useState } from "react";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";

const Private: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const [checkedLogin, setCheckedLogin] = useState<string | null>("");

  useEffect(() => {
    const token: string | null = localStorage.getItem("auth");
    if (token) {
      setCheckedLogin(token);
    } else {
      navigate("/signin");
    }
  });
  return <div>{checkedLogin ? <>
    <Outlet />
  </>
    : null}</div>;
}

export default Private;
