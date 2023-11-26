import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const toastId = toast.loading("Registering User...");

    // create user
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);
        // update profile
        updateUserProfile(data.name, data.photo)
          .then(() => {
            // Profile updated!
          })
          .catch(() => {
            // An error occurred
          });

        // add new user to the database
        const createdAt = result.user?.metadata?.creationTime;
        const user = {
          name: data.name,
          photo: data.photo,
          email: data.email,
          password: data.password,
          createdAt: createdAt,
          role: "user",
        };

        try {
          const response = await axiosPublic.post("/users", user);
          if (response.data.insertedId) {
            toast.success("User Created Successfully.");
          } else if (response.data.message === "Already exists") {
            console.log("User already exist.");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }

        // Logout and redirect to login page
        logOut()
          .then(() => {})
          .catch(() => {
            // An error occurred
          });

        toast.success("Registered Successfully.", { id: toastId });
        reset();
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        // check for duplicate email usage
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Email is in use already", { id: toastId });
        } else if (error.message === "Firebase: Error (auth/invalid-email).") {
          toast.error("Invalid Email", { id: toastId });
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Contest Hub | Register</title>
      </Helmet>
      <section className="flex flex-col lg:flex-row items-center gap-16 md:gap-24 container mx-auto my-20 lg:my-6">
        <div className="flex-1">
          <img
            className="outline-dashed outline-1 outline-blue-gray-50 rounded-xl animate-pulse"
            src="https://i.ibb.co/k5vCkDF/Sign-up.gif"
            alt=""
          />
        </div>
        <div className="flex-1 w-full outline-dotted outline-1 outline-blue-gray-100 p-6 md:p-16 rounded-xl">
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mb-12">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-semibold">Name</p>
              <input
                className="text-details w-full px-5 py-4 rounded-lg outline outline-1 outline-details"
                type="text"
                {...register("name")}
                placeholder="Your Name"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-semibold mt-8">Email</p>
              <input
                className="text-details w-full px-5 py-4 rounded-lg outline outline-1 outline-details"
                type="email"
                {...register("email")}
                placeholder="Your Email"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-semibold mt-8">
                Photo URL
              </p>
              <input
                className="text-details w-full px-5 py-4 rounded-lg outline outline-1 outline-details"
                type="url"
                {...register("photo")}
                placeholder="Your Photo URL"
                required
              />
            </span>
            <span className="space-y-4 relative">
              <p className="text-sub-head text-lg font-semibold mt-8">
                Password
              </p>
              <input
                className="text-details w-full px-5 py-4 rounded-lg outline outline-1 outline-details"
                type={showPass ? "text" : "password"}
                {...register("password", {
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~\\-]).{6,}$/,
                })}
                placeholder="Your Password"
                required
              />
              <span
                className="absolute bottom-0 right-3"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </span>
            </span>
            {errors.password && (
              <p className="mt-3 text-red-500">
                Password must contain one uppercase letter, one special
                character, and not less than 6 characters.
              </p>
            )}
            <span className="flex gap-3 mt-5">
              <input type="checkbox" name="terms" required />
              <p className="text-sub-head">
                I agree the
                <a
                  href="#"
                  className="text-details font-medium hover:text-special"
                >
                  &nbsp;Terms and Conditions
                </a>
              </p>
            </span>
            <button className="bg-special text-white text-xl font-semibold py-4 w-full rounded-lg my-8">
              <input
                className="cursor-pointer"
                type="submit"
                value="Register"
              />
            </button>
          </form>
          <p className="text-center text-sub-head text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-head font-semibold">
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
