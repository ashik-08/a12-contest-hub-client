// import { useContext } from "react";
// import { Link, NavLink } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import Container from "../Container/Container";
// import { Container } from "postcss";
// import Container from "../Container/Container";
// import { AuthContext } from "../../Provider/AuthProvider";
// import toast from "react-hot-toast";
// import { GrCart } from "react-icons/gr";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";

const NavBar = () => {
  const user = null;
  //   const { user, logOut } = useContext(AuthContext);
  //   const [cart] = useCart();
  //   const [isAdmin] = useAdmin();

  //   const handleLogout = () => {
  //     const toastId = toast.loading("Logging Out...");
  //     logOut()
  //       .then(() => {
  //         toast.success("Logged Out Successfully.", { id: toastId });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         toast.error("Something went wrong!", { id: toastId });
  //       });
  //   };

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
                  {links}
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
                <ul className="menu menu-horizontal">{links}</ul>
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
                        <a>{user?.email}</a>
                      </li>
                      <li>
                        <a>{user?.displayName}</a>
                        {/* <Link to="/add-food-item">Add Food Item</Link> */}
                      </li>
                      <li>
                        {/* <Link to="/added-food-items">My Added Food Items</Link> */}
                      </li>
                      <li>
                        {/* <Link to="/ordered-food-items">My Ordered Food Items</Link> */}
                      </li>
                      <li>
                        {/* <button onClick={handleLogout}>Logout</button> */}
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
