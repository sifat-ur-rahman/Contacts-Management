"use client";

import {
  useCreateFavoriteMutation,
  useDeleteContactMutation,
  useGetAllContactsQuery,
  useUpdateContactMutation,
} from "@/app/states/features/contact/contactApi";
import Image from "next/image";
import { Dropdown, Menu, Button } from "antd";
import AppLoading from "../AppLoading";
import AppModal from "../AppModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AppFormInput from "../AppFormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

function AllContact() {
  const [contactId, setContactId] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
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

  const { data, isLoading } = useGetAllContactsQuery({ undefined });

  const foundData = data?.data;
  console.log({ foundData });
  const [createFavorite] = useCreateFavoriteMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();
  if (isLoading) {
    return <AppLoading />;
  }

  const handleFavorite = async (id: any) => {
    const res: any = await createFavorite(id);

    console.log({ res });
    if (!res?.data?.success) {
      toast.error(res?.message || "something went wrong");
    } else {
      toast.success("Successfully Add Favorite");
    }
  };
  const handleDelete = async (id: any) => {
    const res: any = await deleteContact(id);

    console.log({ res });
    if (!res?.data?.success) {
      toast.error(res?.message || "something went wrong");
    } else {
      toast.success("Successfully Delete Contact");
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { name, email, phone, address } = data;
    const updateData = {
      id: contactId,
      contact: {
        name,
        email,
        phone,
        address,
      },
    };
    reset();
    console.log({ updateData });
    const res: any = await updateContact(updateData);

    if (!res?.data?.success) {
      toast.error(res?.message || "Something went wrong");
    } else {
      toast.success("Successfully Updated contact");
      reset();
      setModalOpen(false);
    }
  };
  // Dropdown menu items for each contact
  const menu = (contactId: string) => (
    <Menu>
      <Menu.Item key="2" onClick={() => handleDelete(contactId)}>
        Delete
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleFavorite(contactId)}>
        Favorite
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h3 className="text-4xl text-center font-bold my-10">All Contacts</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:mx-0 mx-4">
        {foundData?.map((data: any) => (
          <div
            className="border flex hover:border-green-300 rounded-xl text-xl p-2 my-3 items-center justify-items-center px-5"
            key={data.id}
          >
            <div className="h-[200] mb-2 mx-2 flex items-center">
              <Image
                src={data.img}
                alt={`${data?.name} Image`}
                width={200}
                height={160}
              />
            </div>
            <div>
              <Dropdown overlay={menu(data._id)} trigger={["click"]}>
                <div className="flex flex-col items-end p-2 cursor-pointer">
                  <BsThreeDotsVertical />
                </div>
              </Dropdown>
              <div>
                <p>
                  Name: <span className="font-bold">{data?.name}</span>
                </p>
                <p>
                  Email:{" "}
                  <span className="font-bold">{data?.email.split(0, 10)}</span>
                </p>
                <p>
                  Phone Number: <span className="font-bold">{data?.phone}</span>
                </p>
                <p>
                  Address: <span className="font-bold">{data?.address}</span>
                </p>
              </div>
              <div className=" flex justify-between">
                <AppModal
                  button={
                    <button className="p-2  bottom-0 bg-white font-bold text-blue-600 rounded-lg my-3 border border-blue-600 hover:bg-blue-600 hover:text-white">
                      Details
                    </button>
                  }
                >
                  <div className="h-[200] mb-2 flex items-center">
                    <Image
                      src={data.img}
                      alt={`${data?.name} Image`}
                      width={200}
                      height={160}
                    />
                  </div>
                  <div className="text-xl">
                    <p>
                      Name: <span className="font-bold">{data?.name}</span>
                    </p>
                    <p>
                      Email: <span className="font-bold">{data?.email}</span>
                    </p>
                    <p>
                      Phone Number:{" "}
                      <span className="font-bold">{data?.phone}</span>
                    </p>
                    <p>
                      Address:{" "}
                      <span className="font-bold">{data?.address}</span>
                    </p>
                  </div>
                </AppModal>
                <AppModal
                  button={
                    <button
                      onClick={() => setContactId(data._id)}
                      className="p-2  bottom-0 bg-white font-bold text-pink-600 rounded-lg my-3 border border-pink-600 hover:bg-pink-600 hover:text-white"
                    >
                      Update
                    </button>
                  }
                  modalOpen={isModalOpen}
                  setModalOpen={setModalOpen}
                >
                  <form
                    className="w-full md:w-[500px] 2xl:w-[560px] py-4 2xl:py-5 space-y-3 lg:space-y-4 2xl:space-y-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <AppFormInput
                      name="name"
                      required={true}
                      register={register}
                      defaultValue={data?.name}
                      type="text"
                      label="Name"
                      placeholder="Name"
                      error={errors.name}
                    />

                    <AppFormInput
                      name="email"
                      register={register}
                      defaultValue={data?.email}
                      type="text"
                      label="Email"
                      placeholder="Email"
                      error={errors.email}
                    />
                    <AppFormInput
                      name="phone"
                      required={true}
                      defaultValue={data?.phone}
                      register={register}
                      type="text"
                      label="Phone number"
                      placeholder="phone number"
                      error={errors.phone}
                    />

                    <AppFormInput
                      name="address"
                      defaultValue={data?.address}
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
                      <button
                        type="submit"
                        className="appBtn mt-4 lg:mt-6 w-full"
                      >
                        Submit
                      </button>
                    )}
                  </form>
                </AppModal>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllContact;
