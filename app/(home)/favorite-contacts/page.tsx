"use client";

import AppLoading from "@/app/components/ui/AppLoading";
import { useGetFavoriteContactQuery } from "@/app/states/features/contact/contactApi";

function FavoriteContacts() {
  const { data, isLoading } = useGetFavoriteContactQuery({ undefined });
  const foundData = data?.data;
  if (isLoading) {
    return <AppLoading />;
  }
  return (
    <div>
      <h3 className="text-4xl text-center font-bold my-10">
        Favorite Contacts
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:mx-0 mx-4">
        {foundData?.map((data: any) => (
          <div
            className="border flex hover:border-green-300 rounded-xl text-xl p-2 my-3 items-center justify-items-center px-5"
            key={data.id}
          >
            {" "}
            <div>
              <p>
                Name: <span className="font-bold">{data?.name}</span>
              </p>
              <p>
                Email: <span className="font-bold">{data?.email}</span>
              </p>
              <p>
                Phone Number: <span className="font-bold">{data?.phone}</span>
              </p>
              <p>
                Address: <span className="font-bold">{data?.address}</span>
              </p>
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
}

export default FavoriteContacts;
