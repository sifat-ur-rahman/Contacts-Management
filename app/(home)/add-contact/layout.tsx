import ProtectedRoute from "@/app/components/shared/ProtectedRoute";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      <div>{children}</div>
    </ProtectedRoute>
  );
};

export default layout;
