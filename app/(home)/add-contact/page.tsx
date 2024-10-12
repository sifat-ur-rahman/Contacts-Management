"use client";

import AppFormInput from "@/app/components/ui/AppFormInput";
import { useCreateContactMutation } from "@/app/states/features/contact/contactApi";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

function AddContact() {
  const [createContact, { isLoading }] = useCreateContactMutation();
  interface FormData {
    images: FileList;
    name: string;
    email: string;
    phone: string;
    address: string;
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { images, name, email, phone, address } = data;
    const image = images[0];

    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=a135457f4ca9a16c458962a3ed75df96`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (imgData) => {
        if (imgData.success) {
          //contact data
          const contact = {
            name,

            img: imgData.data.url,
            email,
            phone,
            address,
          };
          console.log({ contact });

          const res: any = await createContact(contact);
          console.log({ res });
          if (!res?.data?.success) {
            toast.error(res?.message || "something went wrong");
          } else {
            toast.success("Successfully Add Contacts");
            reset();
            router.push(`/`);
          }
        }
      });
  };

  return (
    <div>
      <div className="w-full lg:w-[100%]   px-4 lg:px-0 overflow-auto flex items-center justify-center ">
        <div className="w-full lg:max-w-lg mx-auto py-8  lg:py-20 2xl:py-36">
          <h2 className="text-2xl lg:text-4xl font-bold text-textBlack pb-1 lg:pb-2 text-center">
            Add Contacts
          </h2>

          <form
            className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <AppFormInput
              name="images"
              required={true}
              register={register}
              type="file"
              label="Image"
              placeholder="product images"
              error={errors.images}
            />
            <AppFormInput
              name="name"
              required={true}
              register={register}
              type="text"
              label="Name"
              placeholder="Name"
              error={errors.name}
            />

            <AppFormInput
              name="email"
              register={register}
              type="text"
              label="Email"
              placeholder="Email"
              error={errors.email}
            />
            <AppFormInput
              name="phone"
              required={true}
              register={register}
              type="text"
              label="Phone number"
              placeholder="phone number"
              error={errors.phone}
            />

            <AppFormInput
              name="address"
              required={true}
              register={register}
              type="text"
              label="Address"
              placeholder="Address"
              error={errors.address}
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
}

export default AddContact;
