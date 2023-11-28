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
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageContests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allContests = [], refetch } = useQuery({
    queryKey: ["all-contests"],
    queryFn: async () => {
      const response = await axiosPublic.get("/contests");
      return response.data;
    },
  });

  const TABLE_HEAD = [
    "",
    "Title",
    "Prize Money",
    "Added By",
    "Status",
    "Delete",
    "Confirm",
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
        // delete contest from the database
        try {
          const response = await axiosPublic.delete(`/contests/${id}`);
          if (response.data.deletedCount > 0) {
            toast.success("Contest Deleted Successfully.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting this contest.", {
            id: toastId,
          });
        }
      }
    });
  };

  const handleConfirm = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Approving Contest...");
        // update contest status to 'Approved' in the database
        try {
          const response = await axiosPublic.put(`/contest/${id}`);
          if (response.data.modifiedCount > 0) {
            toast.success("Contest Approval Successful.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while approving this contest.", {
            id: toastId,
          });
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Contest Hub | Manage Contests</title>
      </Helmet>
      <section>
        <SectionTitle
          subHeading="--- How many??? ---"
          heading="manage all contests"
        />
        {/* TABLE CARD */}
        <Card className="h-full w-full p-4">
          {/* TABLE HEADER */}
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <Typography variant="h4" color="blue-gray">
              Total Contests List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all contests
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
                {allContests?.map(
                  (
                    {
                      _id,
                      contest_image,
                      contest_name,
                      contest_type,
                      prize_money,
                      created_by_email,
                      status,
                    },
                    index
                  ) => {
                    const isLast = index === allContests?.length - 1;
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
                            className="font-medium"
                          >
                            ${prize_money}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="paragraph"
                            className="font-medium"
                          >
                            {created_by_email}
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
                        <td
                          className={classes}
                          onClick={() => handleContestDelete(_id)}
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
                        <td
                          className={classes}
                          onClick={
                            status === "pending"
                              ? () => handleConfirm(_id)
                              : () => toast.error("Already Approved!")
                          }
                        >
                          <Tooltip content="Approve Contest">
                            <IconButton variant="text">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            </IconButton>
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

export default ManageContests;
