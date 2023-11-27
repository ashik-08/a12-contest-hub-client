import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useGetRole = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: userRole } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/users/role/${user.email}`);
      return response.data;
    },
  });
  return [userRole];
};

export default useGetRole;
