import SensolistTag from "@/components/authentication/SensolistTag";

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className=" h-[100vh] flex overflow-y-auto flex-col
       bg-[url('/assets/auth-bg.jpeg')] bg-cover bg-center px-4"
    >
      <div
        className=" flex w-full flex-col z-20
        max-w-[380px] h-[540px]
        mt-10 mx-auto lg:ml-auto lg:mr-24
        py-4 px-6 md:py-8 md:px-6 lg:px-8
        border border-white-opacity-900 rounded-3xl
      bg-gradient-opacity backdrop-blur-xl
      "
      >
        {children}
      </div>
      <SensolistTag />
    </div>
  );
}
