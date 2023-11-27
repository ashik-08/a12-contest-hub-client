import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import Container from "../Container/Container";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import useGetRole from "../hooks/useGetRole";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userRole] = useGetRole();
  const location = useLocation();

  const handleLogout = () => {
    const toastId = toast.loading("Logging Out...");
    logOut()
      .then(() => {
        toast.success("Logged Out Successfully.", { id: toastId });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!", { id: toastId });
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-special text-sm md:text-lg font-bold"
              : "text-sm md:text-lg"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-contest"
          className={({ isActive }) =>
            isActive
              ? "text-special text-sm md:text-lg font-bold"
              : "text-sm md:text-lg"
          }
        >
          All Contest
        </NavLink>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <NavLink to="/dashboard/participated-contests">
          My Participated Contests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/winning-contests">My Winning Contests</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile">My Profile</NavLink>
      </li>
    </>
  );

  const creatorLinks = (
    <>
      <li>
        <NavLink to="/dashboard/add-contest">Add Contest</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-created-contests">
          My Created Contests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/contest-submitted">
          Contest Submitted
        </NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-contests">Manage Contests</NavLink>
      </li>
    </>
  );

  const dashboardLinks = (
    <>
      {userRole?.participant && userLinks}
      {userRole?.creator && creatorLinks}
      {userRole?.admin && adminLinks}
    </>
  );

  return (
    <div className="fixed z-10 w-screen">
      <nav className="bg-gray-50">
        <Container>
          <div className="navbar">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-4 z-[1] p-2 drop-shadow-lg bg-base-100 rounded-box w-max"
                >
                  {location?.pathname === "/" ? links : dashboardLinks}
                </ul>
              </div>
              {/* logo & name */}
              <div className="flex justify-center items-center gap-2 md:gap-4">
                <img
                  className="w-10 md:w-12 lg:w-14 xl:w-16"
                  src={logo}
                  alt="logo-img"
                />
                <Link
                  to="/"
                  className="text-head md:text-3xl xl:text-4xl font-slab font-bold"
                >
                  Contest Hub
                </Link>
              </div>
            </div>
            {/* <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div> */}
            <div className="navbar-end">
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal">
                  {location?.pathname === "/" ? links : dashboardLinks}
                </ul>
              </div>
              {user?.email ? (
                // dropdown icon
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 md:w-14 lg:w-16 rounded-full">
                      {user?.photoURL ? (
                        <img
                          className="text-[10px]"
                          src={user?.photoURL}
                          alt="img-error"
                        />
                      ) : (
                        <img
                          className="text-[10px]"
                          src="https://img.icons8.com/ios-filled/50/user-male-circle.png"
                          alt="default"
                        />
                      )}
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-4 z-[1] p-2 drop-shadow-lg bg-base-100 rounded-box w-max"
                  >
                    <>
                      <li>
                        <p className="pointer-events-none">
                          {user?.displayName}
                        </p>
                      </li>
                      {location?.pathname.includes("/dashboard") ? (
                        <>
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>
                            <Link to="/all-contest">All Contest</Link>
                          </li>
                        </>
                      ) : (
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                      )}
                      {/* <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li> */}
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-ghost md:text-lg px-3 py-1.5 rounded-lg"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default NavBar;
