import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useSingleContest = (id) => {
  const axiosPublic = useAxiosPublic();

  const { data: contest = [], refetch } = useQuery({
    queryKey: ["single-contest", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/contest/${id}`);
      return response.data;
    },
  });
  return [contest, refetch];
};

export default useSingleContest;
