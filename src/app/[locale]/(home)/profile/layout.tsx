import ProfileContainer from "@/components/ProfileContainer";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-1 flex-col">
      <ProfileContainer>{children}</ProfileContainer>
    </div>
  );
}
