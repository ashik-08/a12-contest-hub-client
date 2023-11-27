import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useGetRole from "../components/hooks/useGetRole";

const CreatorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [userRole] = useGetRole();
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner text-info mt-24 md:mt-32 lg:mt-36 xl:mt-40"></span>
      </div>
    );
  }

  if (user?.email && userRole?.creator) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

CreatorRoute.propTypes = {
  children: PropTypes.node,
};

export default CreatorRoute;
