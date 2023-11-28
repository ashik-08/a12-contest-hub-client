import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Fragment, useContext, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";

const tags = [
  "Business Contest",
  "Medical Contest",
  "Article Writing",
  "Gaming",
];

const UpdateContest = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    contest_name,
    contest_image,
    description,
    contest_price,
    prize_money,
    submission_instruction,
    contest_type,
    contest_deadline,
    created_by_email,
  } = useLoaderData();

  const [selected, setSelected] = useState(contest_type);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (created_by_email !== user?.email) {
      return toast.error("You can't update this contest data.");
    }
    const toastId = toast.loading("Updating Contest Data...");

    const updatedContest = {
      contest_name: data.name,
      contest_image: data.image,
      description: data.description,
      contest_price: Number(data.price),
      prize_money: Number(data.prize),
      submission_instruction: data.instruction,
      contest_type: selected,
      contest_deadline: data.deadline,
    };

    try {
      const response = await axiosSecure.patch(
        `/contest/${id}`,
        updatedContest
      );

      if (response.data.modifiedCount > 0) {
        toast.success("Contest Data Updated Successfully.", { id: toastId });
        reset();
        navigate("/dashboard/my-created-contests");
      } else if (response.data.modifiedCount === 0) {
        toast.error("First make some changes.", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating this contest.", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contest Hub | Update Contest</title>
      </Helmet>
      <section>
        <SectionTitle
          subHeading="--- Change Now ---"
          heading="update a contest"
        />
        <div className="animated-gradient px-5 md:px-14 lg:px-28 py-20 drop-shadow-sm">
          <h1 className="text-center text-head font-slab font-medium text-4xl lg:text-5xl mb-8">
            Update Existing Contest
          </h1>
          <p className="text-center text-blue-gray-400 md:text-lg mb-8 px-4 md:px-14 italic">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-medium">Name</p>
              <input
                className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
                type="text"
                defaultValue={contest_name}
                {...register("name")}
                placeholder="Enter contest name"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-medium">Image</p>
              <input
                className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
                type="url"
                defaultValue={contest_image}
                {...register("image")}
                placeholder="Enter image URL"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-medium">Description</p>
              <input
                className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
                type="text"
                defaultValue={description}
                {...register("description")}
                placeholder="Enter contest description"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-medium">Price</p>
              <input
                className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
                type="text"
                defaultValue={contest_price}
                {...register("price")}
                placeholder="Enter contest price"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-medium">Prize</p>
              <input
                className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
                type="text"
                defaultValue={prize_money}
                {...register("prize")}
                placeholder="Enter prize money"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-medium">Instruction</p>
              <input
                className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
                type="text"
                defaultValue={submission_instruction}
                {...register("instruction")}
                placeholder="Enter submission instruction"
                required
              />
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-medium">Type</p>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative cursor-default text-left text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500">
                    <span className="block truncate">{selected}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {tags.map((tag, tagIdx) => (
                        <Listbox.Option
                          key={tagIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={tag}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {tag}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </span>
            <span className="space-y-4">
              <p className="text-sub-head text-lg font-medium">Deadline</p>
              <input
                className="text-details w-full p-3 rounded-md bg-transparent outline-dotted outline-1 outline-blue-gray-500"
                type="datetime-local"
                defaultValue={contest_deadline}
                {...register("deadline")}
                placeholder="Enter contest deadline"
                required
              />
            </span>
            <span className="md:col-span-2 mt-6">
              <input
                className="bg-head text-sub-head text-xl font-medium w-full p-3 rounded-md"
                type="submit"
                value="Update Contest"
              />
            </span>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateContest;
