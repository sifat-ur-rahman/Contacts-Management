"use client";
import AppLoading from "@/app/components/ui/AppLoading";

import { useGetProfileQuery } from "@/app/states/features/user/userApi";
import Image from "next/image";
import Link from "next/link";
import { LeftCircleOutlined } from "@ant-design/icons";
import { useGetClaimByUserQuery } from "@/app/states/features/claim/claimApi";
import { Empty } from "antd";

function MyClaimItem() {
  const { data, isLoading } = useGetProfileQuery({ undefined });
  const userInfo = data?.data;

  const userId = userInfo?.id;

  const { data: claimData } = useGetClaimByUserQuery({ userId });
  if (isLoading) {
    return <AppLoading />;
  }
  if (!isLoading && claimData?.data?.length <= 0) {
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
            All New Found Item
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
          All New Found Item
        </Link>
      </div>
      <h3 className="text-4xl text-center font-bold my-5">My Claim Report</h3>
      {claimData?.data.map((data: any) => (
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 bg-green-100 rounded-xl text-xl p-2 my-3 items-center  justify-items-center px-5"
          key={data.id}
        >
          <p>
            Description:<p className="font-bold">{data?.description}</p>
          </p>
          <p>
            Phone:<p className="font-bold">{data?.contactPhone}</p>
          </p>
          <p>
            Status:<p className="font-bold ">{data?.status}</p>
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyClaimItem;
