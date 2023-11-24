import { Helmet } from "react-helmet-async";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { addUser } from "../../api/flavor_fusion";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const { user, createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: addUser,
  });

  // Check if the user is already authenticated
  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    // const terms = form.terms.checked;
    // console.log(name, email, password, photo, terms);

    const passRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?]{6,}$/;

    // check password
    if (!passRegex.test(password)) {
      toast.error(
        "Password must contain one uppercase letter, one special character, and minimum 6 characters."
      );
      return;
    }

    const toastId = toast.loading("Registering User...");

    // create user
    createUser(email, password)
      .then(async (result) => {
        console.log(result.user);
        // update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            // Profile updated!
          })
          .catch(() => {
            // An error occurred
          });

        // add new user to the database
        const createdAt = result?.user?.metadata?.creationTime;
        const user = { name, photo, email, password, createdAt: createdAt };

        try {
          const result = await mutateAsync(user);
          if (result.insertedId) {
            toast.success("User Created Successfully.");
          } else if (result.message === "Already exists") {
            console.log("User already exist.");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
        toast.success("Registered Successfully.", { id: toastId });
        form.reset();
        navigate("/");
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
        <title>Flavor Fusion | Register</title>
      </Helmet>
      <section className="flex flex-col lg:flex-row items-center gap-16 md:gap-24 container mx-auto my-20 lg:my-6">
        <div className="flex-1">
          <img
            className="outline-dashed outline-1 outline-blue-gray-50 rounded-xl animate-pulse"
            src="https://i.ibb.co/khbXyRj/Sign-up.gif"
            alt=""
          />
        </div>
        <div className="flex-1 w-full outline-dotted outline-1 outline-blue-gray-100 p-6 md:p-16 rounded-xl">
          <h1 className="text-center text-sub-head text-2xl md:text-3xl lg:text-4xl font-semibold mb-12">
            Sign Up
          </h1>
          <form onSubmit={handleRegister}>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-semibold">Name</p>
              <input
                className="text-details w-full px-5 py-4 rounded-lg outline outline-1"
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-semibold mt-8">Email</p>
              <input
                className="text-details w-full px-5 py-4 rounded-lg outline outline-1"
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-semibold mt-8">
                Photo URL
              </p>
              <input
                className="text-details w-full px-5 py-4 rounded-lg outline outline-1"
                type="url"
                name="photo"
                placeholder="Your Photo URL"
                required
              />
            </span>
            <span className="space-y-4 relative">
              <p className="text-sub-head text-lg font-semibold mt-8">
                Password
              </p>
              <input
                className="text-details w-full px-5 py-4 rounded-lg outline outline-1"
                type={showPass ? "text" : "password"}
                name="password"
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
            <span className="flex gap-3 mt-5">
              <input type="checkbox" name="terms" required />
              <p className="text-sub-head">
                I agree the
                <a
                  href="#"
                  className="text-details font-medium hover:text-head"
                >
                  &nbsp;Terms and Conditions
                </a>
              </p>
            </span>
            <button className="bg-head text-white text-xl font-semibold py-4 w-full rounded-lg my-8">
              <input type="submit" value="Register" />
            </button>
          </form>
          <p className="text-center text-sub-head text-lg">
            Already have an account?{" "}
            <Link to="/login" className="text-saffron font-semibold">
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
