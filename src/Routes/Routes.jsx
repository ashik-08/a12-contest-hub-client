import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/DashboardPage/Dashboard";
import ManageUsers from "../pages/DashboardPage/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import AddContest from "../pages/DashboardPage/Creator/AddContest";
import CreatorRoute from "./CreatorRoute";
import MyCreatedContests from "../pages/DashboardPage/Creator/MyCreatedContests";
import UpdateContest from "../pages/DashboardPage/Creator/UpdateContest";
import ManageContests from "../pages/DashboardPage/Admin/ManageContests";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllContestPage from "../pages/AllContestPage/AllContestPage";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import Payment from "../pages/Payment/Payment";
import MyRegisteredContest from "../pages/DashboardPage/Participant/MyRegisteredContest";
import ContestSubmitted from "../pages/DashboardPage/Creator/ContestSubmitted";
import MyProfile from "../pages/DashboardPage/Participant/MyProfile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "all-contest",
        element: <AllContestPage />,
      },
      {
        path: "all-contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          // fetch(`https://a12-contest-hub-server.vercel.app/contest/${params.id}`),
          fetch(`http://localhost:5001/contest/${params.id}`),
      },
      {
        path: "register-by-payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      // admin routes
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <AdminRoute>
            <ManageContests />
          </AdminRoute>
        ),
      },
      // creator route
      {
        path: "add-contest",
        element: (
          <CreatorRoute>
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "my-created-contests",
        element: (
          <CreatorRoute>
            <MyCreatedContests />
          </CreatorRoute>
        ),
      },
      {
        path: "update-contest/:id",
        element: (
          <CreatorRoute>
            <UpdateContest />
          </CreatorRoute>
        ),
        loader: ({ params }) =>
          // fetch(`https://a12-contest-hub-server.vercel.app/contest/${params.id}`),
          fetch(`http://localhost:5001/contest/${params.id}`),
      },
      {
        path: "contest-submitted/:id",
        element: (
          <CreatorRoute>
            <ContestSubmitted />
          </CreatorRoute>
        ),
      },
      // participant
      {
        path: "registered-contests",
        element: (
          <PrivateRoute>
            <MyRegisteredContest />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
