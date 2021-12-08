import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

const AuthenticatedRoute: React.VFC = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return user.auth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
