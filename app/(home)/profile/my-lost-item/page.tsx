"use client";
import AppLoading from "@/app/components/ui/AppLoading";

import { useGetProfileQuery } from "@/app/states/features/user/userApi";
import Image from "next/image";
import Link from "next/link";
import { LeftCircleOutlined } from "@ant-design/icons";
import { useGetLostByUserQuery } from "@/app/states/features/lost/lostApi";
import { Empty } from "antd";

function MyLostItem() {
  const { data, isLoading } = useGetProfileQuery({ undefined });
  const userInfo = data?.data;

  const userId = userInfo?.id;

  const { data: lostData } = useGetLostByUserQuery({ userId });
  if (isLoading) {
    return <AppLoading />;
  }
  if (!isLoading && lostData?.data?.length <= 0) {
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
            href="/add-lost-item"
            className="px-6 py-3 border border-rose-600 bg-rose-600 font-bold text-white rounded-lg  hover:bg-rose-100 hover:text-rose-700"
          >
            Report a New Lost Item
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
          href="/add-lost-item"
          className="px-6 py-3 border border-rose-600 bg-rose-600 font-bold text-white rounded-lg  hover:bg-rose-100 hover:text-rose-700"
        >
          Report a New Lost Item
        </Link>
      </div>
      <h3 className="text-4xl text-center font-bold my-5">My Lost Item</h3>
      {lostData?.data.map((data: any) => (
        <div
          className="grid grid-cols-2 lg:grid-cols-5 gap-3 bg-rose-50 rounded-xl text-xl p-2 my-3 items-center  justify-items-center px-5"
          key={data.id}
        >
          <Image src={data?.images} alt="img" width={100} height={80} />
          <p>
            Category: <p className="font-bold">{data?.category}</p>
          </p>
          <p>
            description:<p className="font-bold">{data?.description}</p>
          </p>
          <p>
            Found Location:<p className="font-bold">{data?.locationLost}</p>
          </p>
          <p>
            Status:<p className="font-bold ">{data?.status}</p>
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyLostItem;
