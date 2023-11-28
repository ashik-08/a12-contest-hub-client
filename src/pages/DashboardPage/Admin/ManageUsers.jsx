import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  const TABLE_HEAD = ["", "Image", "Name", "Email", "Role", "Change Role"];

  const handleRoleUpdate = (id, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change role!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Updating User Role...");
        // update user role to the database
        try {
          const response = await axiosSecure.patch(`/users/${id}`, { newRole });
          if (response.data.modifiedCount > 0) {
            toast.success("User Role Updated Successfully.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while updating user role.", {
            id: toastId,
          });
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Contest Hub | Manage Users</title>
      </Helmet>
      <section>
        <SectionTitle
          subHeading="--- How many??? ---"
          heading="manage all users"
        />
        {/* USERS TABLE */}
        {/* TABLE CARD */}
        <Card className="h-full w-full p-4">
          {/* TABLE HEADER */}
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <Typography variant="h4" color="blue-gray">
              Total Users List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </CardHeader>
          {/* TABLE BODY */}
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allUsers?.map(({ _id, photo, name, email, role }, index) => {
                  const isLast = index === allUsers?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>{index + 1}</td>
                      <td className={classes}>
                        <Avatar src={photo} alt={name} size="xl" />
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {" "}
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="paragraph" className="font-medium">
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="w-fit px-3 py-1 bg-opacity-80 rounded-md font-medium border border-head"
                        >
                          {" "}
                          {role}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <select
                          className="px-1 py-1 rounded outline outline-1 outline-head"
                          onChange={(e) =>
                            handleRoleUpdate(_id, e.target.value)
                          }
                          defaultValue={"default"}
                        >
                          <option disabled value="default">
                            {role}
                          </option>
                          {role === "admin" && (
                            <>
                              <option value="creator">creator</option>
                              <option value="user">user</option>
                            </>
                          )}
                          {role === "creator" && (
                            <>
                              <option value="admin">admin</option>
                              <option value="user">user</option>
                            </>
                          )}
                          {role === "user" && (
                            <>
                              <option value="admin">admin</option>
                              <option value="creator">creator</option>
                            </>
                          )}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          {/* TABLE FOOTER */}
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 1
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default ManageUsers;
