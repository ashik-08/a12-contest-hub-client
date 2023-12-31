import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: userRole, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/role/${user.email}`);
      return response.data;
    },
  });
  return [userRole, isLoading];
};

export default useGetRole;
