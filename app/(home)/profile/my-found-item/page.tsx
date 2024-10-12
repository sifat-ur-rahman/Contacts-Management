"use client";
import AppLoading from "@/app/components/ui/AppLoading";
import { useGetFoundByUserQuery } from "@/app/states/features/contact/contactApi";
import { useGetProfileQuery } from "@/app/states/features/user/userApi";
import Image from "next/image";
import Link from "next/link";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Empty } from "antd";

function MyFoundItem() {
  const { data, isLoading } = useGetProfileQuery({ undefined });
  const userInfo = data?.data;

  const userId = userInfo?.id;

  const { data: foundData } = useGetFoundByUserQuery({ userId });
  if (isLoading) {
    return <AppLoading />;
  }
  if (!isLoading && foundData?.data?.length <= 0) {
    return (
      <div className="container mx-auto min-h-screen">
        <div className="flex justify-between mt-5 items-center">
          <Link
            href="/profile"
            className="text-3xl p-3 text-blue-500 hover:bg-blue-50 rounded-xl"
          >
            <LeftCircleOutlined /> Profile
          </Link>
          <Link
            href="/add-found-item"
            className="px-6 py-3 border border-green-600 bg-green-600 font-bold text-white rounded-lg  hover:bg-green-100 hover:text-green-700"
          >
            Report a New Found Item
          </Link>
        </div>
        <Empty />
      </div>
    );
  }
  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex justify-between mt-5 items-center">
        <Link
          href="/profile"
          className="text-3xl p-3 text-blue-500 hover:bg-blue-50 rounded-xl"
        >
          <LeftCircleOutlined /> Profile
        </Link>
        <Link
          href="/add-found-item"
          className="px-6 py-3 border border-green-600 bg-green-600 font-bold text-white rounded-lg  hover:bg-green-100 hover:text-green-700"
        >
          Report a New Found Item
        </Link>
      </div>
      <h3 className="text-4xl text-center font-bold my-5">My Found Item</h3>
      {foundData?.data.map((data: any) => (
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-green-100 rounded-xl text-xl p-2 my-3 items-center  justify-items-center px-5"
          key={data.id}
        >
          <Image src={data?.images} alt="img" width={70} height={60} />
          <p>
            Category: <p className="font-bold">{data?.category}</p>
          </p>
          <p>
            description:<p className="font-bold">{data?.description}</p>
          </p>
          <p>
            Found Location:<p className="font-bold">{data?.locationFound}</p>
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyFoundItem;
