import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";

const MyCreatedContests = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: myContests = [], refetch } = useQuery({
    queryKey: ["myContests", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`/contests/${user?.email}`);
      return response.data;
    },
  });

  const TABLE_HEAD = [
    "",
    "Title",
    "Prize Money",
    "Status",
    "Edit",
    "Delete",
    "See Submission",
  ];

  const handleContestDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting Contest...");
        // delete own created contest from the database
        try {
          const response = await axiosPublic.delete(`/contests/${id}`);
          if (response.data.deletedCount > 0) {
            toast.success("Contest Deleted Successfully.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while adding this contest.", {
            id: toastId,
          });
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Contest Hub | My Created Contests</title>
      </Helmet>
      <section>
        <SectionTitle subHeading="--- Let's see ---" heading="added contests" />
        {/* TABLE CARD */}
        <Card className="h-full w-full p-4">
          {/* TABLE HEADER */}
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h4" color="blue-gray">
                  My Created Contests List
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about my contests
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link to="/all-contest">
                  <Button variant="outlined" size="md">
                    view all
                  </Button>
                </Link>
                <Link to="/dashboard/add-contest">
                  <Button className="flex items-center gap-3" size="md">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                    contest
                  </Button>
                </Link>
              </div>
            </div>
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
                {myContests?.map(
                  (
                    {
                      _id,
                      contest_image,
                      contest_name,
                      contest_type,
                      prize_money,
                      status,
                    },
                    index
                  ) => {
                    const isLast = index === myContests?.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={classes}>{index + 1}</td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={contest_image}
                              alt={contest_name}
                              size="xl"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="lead"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {" "}
                                {contest_name}
                              </Typography>
                              <Typography
                                variant="paragraph"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {" "}
                                {contest_type}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="paragraph"
                            className="text-saffron font-medium"
                          >
                            ${prize_money}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="w-fit px-3 py-1 bg-opacity-80 rounded-md font-medium border border-head"
                          >
                            {" "}
                            {status}
                          </Typography>
                        </td>
                        <td className={classes}>
                          {status === "pending" ? (
                            <Link to={`/dashboard/update-contest/${_id}`}>
                              <Tooltip content="Edit Contest">
                                <IconButton variant="text">
                                  <PencilIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            </Link>
                          ) : (
                            <Tooltip content="Edit Contest">
                              <IconButton
                                variant="text"
                                onClick={() =>
                                  toast.error(
                                    "Contest Approved. Can't Modify Now!"
                                  )
                                }
                              >
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </td>
                        <td
                          className={classes}
                          onClick={
                            status === "pending"
                              ? () => handleContestDelete(_id)
                              : () =>
                                  toast.error(
                                    "You can't delete approved contest!"
                                  )
                          }
                        >
                          <Tooltip content="Delete Contest">
                            <IconButton variant="text">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </IconButton>
                          </Tooltip>
                        </td>
                        <td className={classes}>
                          <Tooltip content="See Submission">
                            {status === "pending" ? (
                              <IconButton
                                variant="text"
                                onClick={() =>
                                  toast.error("Contest Need Approval First")
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </IconButton>
                            ) : (
                              <Link to="/dashboard/contest-submitted">
                                <IconButton variant="text">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </IconButton>
                              </Link>
                            )}
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  }
                )}
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

export default MyCreatedContests;
