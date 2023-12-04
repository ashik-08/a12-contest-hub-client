import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating User Profile...");

    // update profile
    updateUserProfile(data.name, data.photo)
      .then(() => {
        // Profile updated!
      })
      .catch(() => {
        // An error occurred
      });

    // update user to the database
    const user = {
      name: data.name,
      photo: data.photo,
    };

    try {
      const response = await axiosSecure.put(`/users/${user?.email}`, user);
      if (response.data.modifiedCount > 0) {
        toast.success("User Updated Successfully.", { toastId });
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message, { toastId });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contest Hub | My Profile</title>
      </Helmet>
      <section>
        <SectionTitle subHeading="--- Welcome to ---" heading="profile" />
        <div>
          <img
            className="mx-auto w-52 h-52 rounded-full"
            src={user?.photoURL}
            alt=""
          />
          <h1 className="mt-8 text-center text-special text-3xl font-medium font-slab">
            {user?.displayName}
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container mx-auto max-w-xs mt-10"
        >
          <span className="space-y-4">
            <p className="text-sub-head text-lg font-medium">Name</p>
            <input
              className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              required
            />
          </span>
          <span className="space-y-4">
            <p className="text-sub-head text-lg font-medium mt-5">Photo</p>
            <input
              className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
              type="url"
              {...register("photo")}
              placeholder="Enter image URL"
              required
            />
          </span>
          <input
            className="bg-head text-sub-head text-xl font-medium w-full p-3 rounded-md mt-8"
            type="submit"
            value="Update Profile"
          />
        </form>
      </section>
    </>
  );
};

export default MyProfile;
