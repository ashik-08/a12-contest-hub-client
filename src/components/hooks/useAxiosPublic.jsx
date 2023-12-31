import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://a12-contest-hub-server.vercel.app",
  // baseURL: "http://localhost:5001",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
