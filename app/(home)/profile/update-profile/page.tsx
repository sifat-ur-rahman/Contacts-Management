"use client";

import AppFormInput from "@/app/components/ui/AppFormInput";
import AppLoading from "@/app/components/ui/AppLoading";
import {
  useEditProfileMutation,
  useGetProfileQuery,
} from "@/app/states/features/user/userApi";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

interface FormData {
  username: string;
  name: string;
  email: string;
}

const UpdateProfile = () => {
  const { data: user, isLoading: userDataLoading } = useGetProfileQuery({
    undefined,
  });
  const [editProfile, { isLoading }] = useEditProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const submittedData = {
      name: data?.name,
    };

    editProfile(submittedData)
      .unwrap()
      .then((res: any) => {
        if (!res?.success) {
          toast.error(res?.message || "something went wrong");
        } else {
          toast.success("Successfully Profile update");
          router.push(`/profile`);
        }
      })
      .catch((res) => {
        toast.error(res?.data?.message || "something went wrong");
      });
  };
  if (userDataLoading) {
    return <AppLoading />;
  }
  return (
    <div className="flex lg:h-[100vh]">
      <div className="w-full lg:w-[100%] h-screen lg:h-full px-4 lg:px-0 overflow-auto flex items-center justify-center ">
        <div className="w-full lg:max-w-lg mx-auto py-8 mt-10 lg:py-20 2xl:py-36">
          <h2 className="text-2xl text-center lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2">
            Profile Update
          </h2>

          <form
            className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AppFormInput
              name="name"
              required={true}
              register={register}
              defaultValue={user?.data?.name}
              type="text"
              label="Full Name"
              error={errors.name}
            />

            <AppFormInput
              name="email"
              readOnly
              required={true}
              defaultValue={user?.data?.email}
              register={register}
              type="text"
              label="Your Email"
              error={errors.email}
            />
            <AppFormInput
              name="username"
              readOnly
              required={true}
              defaultValue={user?.data?.username}
              register={register}
              type="text"
              label="Your User Name"
              error={errors.username}
            />

            {isLoading ? (
              <button className="appBtn px-10 flex items-center justify-center w-full mt-4 lg:mt-6 ">
                <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
              </button>
            ) : (
              <button type="submit" className="appBtn mt-4 lg:mt-6 w-full">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
