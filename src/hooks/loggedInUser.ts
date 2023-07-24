import { IUser } from "@/globalTypes";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

const useLoggedinUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decodedToken: any = jwtDecode(accessToken);
        setUser(decodedToken);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  return { user, setUser, loading };
};

export default useLoggedinUser;
