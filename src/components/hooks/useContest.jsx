import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useContest = () => {
  const axiosPublic = useAxiosPublic();

  const { data: { allContest = [], popular = [] } = {}, refetch } = useQuery({
    queryKey: ["all-contest"],
    queryFn: async () => {
      const response = await axiosPublic.get("/contests");
      return { allContest: response.data.contests, popular: response.data.popular };
    },
  });
  return [allContest, popular, refetch];
};

export default useContest;
