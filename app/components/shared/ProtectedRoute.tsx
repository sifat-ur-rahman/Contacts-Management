"use client";
import { useCurrentToken } from "@/app/states/features/auth/authSlice";
import { useAppSelector } from "@/app/states/hook";
import { useRouter } from "next/navigation";

interface TProtectedRouteProps {
  children: any;
}

const ProtectedRoute = ({ children }: TProtectedRouteProps) => {
  const router = useRouter();
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return router.push("/auth/sign-in");
  }

  return children;
};

export default ProtectedRoute;
