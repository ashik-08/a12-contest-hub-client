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
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useSingleContest from "../../../components/hooks/useSingleContest";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ContestSubmitted = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: submitted = [] } = useQuery({
    queryKey: ["submitted"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/registered/${id}`);
      return response.data;
    },
  });

  const [contest, refetch] = useSingleContest(id);

  const TABLE_HEAD = [
    "",
    "Title",
    "Participant Name",
    "Participant Email",
    "Submitted Task",
    "Make Winner",
  ];

  const handleSelectWinner = (
    contestId,
    participant_name,
    participant_email,
    participant_photo
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, select winner!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Selecting Contest Winner...");

        try {
          const response = await axiosSecure.patch(`/contests/${contestId}`, {
            participant_name,
            participant_email,
            participant_photo,
          });
          if (response.data.modifiedCount > 0) {
            toast.success("Winner Selection Successful.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error(
            "An error occurred while choosing winner of this contest.",
            {
              id: toastId,
            }
          );
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Contest Hub | Submitted Contest</title>
      </Helmet>
      <section>
        <SectionTitle
          subHeading="--- Let's check ---"
          heading="submitted contest"
        />
        {/* TABLE CARD */}
        <Card className="h-full w-full p-4">
          {/* TABLE HEADER */}
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <Typography variant="h4" color="blue-gray">
              Submitted Contests List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about submitted contests
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
                {submitted?.map(
                  (
                    {
                      _id,
                      contestId,
                      contest_image,
                      contest_name,
                      participant_name,
                      participant_email,
                      participant_photo,
                      fileURL,
                    },
                    index
                  ) => {
                    const isLast = index === submitted?.length - 1;
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
                            <Typography
                              variant="lead"
                              color="blue-gray"
                              className="font-medium"
                            >
                              {" "}
                              {contest_name}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {" "}
                            {participant_name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {" "}
                            {participant_email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 hover:text-special"
                          >
                            <Link to={fileURL}>{"Submitted Task"}</Link>
                          </Typography>
                        </td>
                        <td
                          className={classes}
                          onClick={() =>
                            (!contest?.winner_email &&
                              handleSelectWinner(
                                contestId,
                                participant_name,
                                participant_email,
                                participant_photo
                              )) ||
                            (contest?.winner_email &&
                              toast.error("Winner Selected already!"))
                          }
                        >
                          <Tooltip content={"Select as Winner"}>
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

export default ContestSubmitted;
