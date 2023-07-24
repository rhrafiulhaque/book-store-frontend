import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useLoggedinUser from "../hooks/loggedInUser";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, loading } = useLoggedinUser();
  const { pathname } = useLocation();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user?.email && !loading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}
