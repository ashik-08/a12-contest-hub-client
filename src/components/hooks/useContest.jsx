import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useContest = (searchQuery) => {
  const axiosPublic = useAxiosPublic();

  const { data: { allContest = [], popular = [] } = {}, refetch } = useQuery({
    queryKey: ["all-contest", searchQuery],
    queryFn: async () => {
      const response = await axiosPublic.get(`/contests?search=${searchQuery}`);
      return { allContest: response.data.contests, popular: response.data.popular };
    },
  });
  return [allContest, popular, refetch];
};

export default useContest;
