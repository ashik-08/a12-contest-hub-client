import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
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
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const file_upload_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_FILE_UPLOAD_APIKEY
}`;

const MyRegisteredContest = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: myRegistered = [], refetch } = useQuery({
    queryKey: ["my-registered"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/registered/${user?.email}`);
      return response.data;
    },
  });

  const TABLE_HEAD = [
    "",
    "Title",
    "Submission Instruction",
    "Status",
    "Submission *(only pdf)",
    "Confirm",
    "Remove",
  ];

  const handleAttempt = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, participate in!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Participating in Contest...");

        try {
          const response = await axiosSecure.patch(`/registered/${id}`, {
            status: "attempted",
          });
          if (response.data.modifiedCount > 0) {
            toast.success("Participation Successful.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error(
            "An error occurred while participating in this contest.",
            {
              id: toastId,
            }
          );
        }
      }
    });
  };

  const handleFileChange = async (e, id) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const toastId = toast.loading("Submitting file...");
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        // Upload file to imgBB
        const response = await axiosPublic.post(file_upload_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          // Update contest status to 'submitted' and save file URL in database
          try {
            const updateResponse = await axiosSecure.patch(
              `/registered/${id}`,
              {
                status: "submitted",
                fileURL: response.data.data.display_url,
              }
            );

            if (updateResponse.data.modifiedCount > 0) {
              toast.success("Submission Successful.", { id: toastId });
              refetch();
            }
          } catch (error) {
            console.error(error);
            toast.error("An error occurred while submitting the file.", {
              id: toastId,
            });
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while uploading the file.", {
          id: toastId,
        });
      }
    }
  };

  const handleDeleteSubmission = (id) => {
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
        const toastId = toast.loading("Deleting Contest Submission...");

        try {
          const response = await axiosSecure.patch(`/registered/${id}`, {
            status: "attempted",
            fileURL: "",
          });
          if (response.data.modifiedCount > 0) {
            toast.success("Submission Deleted Successfully.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting this submission.", {
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
      confirmButtonText: "Yes, confirm submission!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Submission in Progress...");

        try {
          const response = await axiosSecure.patch(`/registered/${id}`, {
            status: "completed",
          });
          if (response.data.modifiedCount > 0) {
            toast.success("Final Submission Successful.", { id: toastId });
            refetch();
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while finalizing this submission.", {
            id: toastId,
          });
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Contest Hub | My Registered Contests</title>
      </Helmet>
      <section>
        <SectionTitle
          subHeading="--- Let's see ---"
          heading="registered contests"
        />
        {/* TABLE CARD */}
        <Card className="h-full w-full p-4">
          {/* TABLE HEADER */}
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <Typography variant="h4" color="blue-gray">
              My Registered Contests List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all my registered contests
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
                {myRegistered?.map(
                  (
                    {
                      _id,
                      contest_image,
                      contest_name,
                      prize_money,
                      contest_deadline,
                      submission_instruction,
                      status,
                    },
                    index
                  ) => {
                    const isLast = index === myRegistered?.length - 1;
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
                                variant="paragraph"
                                color="blue-gray"
                                className="font-medium"
                              >
                                {" "}
                                {contest_name}
                              </Typography>
                              <Typography
                                variant="paragraph"
                                className="font-medium"
                              >
                                Prize Money: ${prize_money}
                              </Typography>
                              <Typography
                                variant="small"
                                className="font-medium"
                              >
                                Deadline: {contest_deadline}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {" "}
                            {submission_instruction}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="w-fit px-2 py-1 bg-opacity-80 rounded-md font-medium border border-head"
                          >
                            {" "}
                            {status}
                          </Typography>
                        </td>
                        <td>
                          <input
                            type="file"
                            placeholder="You can't touch this"
                            className="file-input file-input-bordered w-full max-w-[260px]"
                            disabled={status !== "attempted"}
                            onChange={(e) => handleFileChange(e, _id)}
                          />
                        </td>
                        <td
                          className={classes}
                          onClick={() =>
                            (status === "registered" && handleAttempt(_id)) ||
                            (status === "submitted" && handleConfirm(_id)) ||
                            (status === "completed" &&
                              toast.error("Final Submission Done!"))
                          }
                        >
                          <Tooltip
                            content={
                              (status === "registered" && "Participate") ||
                              (status === "attempted" && "Submit Now") ||
                              (status === "submitted" &&
                                "Confirm Submission") ||
                              (status === "completed" && "Submission Done")
                            }
                          >
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
                        <td
                          className={classes}
                          onClick={
                            status === "submitted"
                              ? () => handleDeleteSubmission(_id)
                              : () => toast.error("Can't Remove Now!")
                          }
                        >
                          <Tooltip content="Remove Submission">
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

export default MyRegisteredContest;
