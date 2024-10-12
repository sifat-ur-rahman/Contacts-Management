import { Skeleton } from "antd";

const AppLoading = () => {
  return (
    <div className="flex min-h-[80dvh] items-center justify-center mx-auto container">
      <Skeleton active className="py-5" />
    </div>
  );
};

export default AppLoading;
