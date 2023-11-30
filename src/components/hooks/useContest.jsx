import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useContest = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allContest = [], refetch } = useQuery({
    queryKey: ["all-contest"],
    queryFn: async () => {
      const response = await axiosPublic.get("/contests");
      return response.data;
    },
  });
  return [allContest, refetch];
};

export default useContest;
