import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useGetRole from "../components/hooks/useGetRole";

const CreatorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [userRole, isLoading] = useGetRole();
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner text-info mt-28 md:mt-32 lg:mt-36 xl:mt-40"></span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-[35%] md:pt-[30%] lg:pt-[25%] 2xl:pt-[20%]">
        <div className="w-16 h-16 border-4 border-dashed border-special rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user?.email && userRole?.creator) {
    return children;
  }

  return (
    <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
  );
};

CreatorRoute.propTypes = {
  children: PropTypes.node,
};

export default CreatorRoute;
