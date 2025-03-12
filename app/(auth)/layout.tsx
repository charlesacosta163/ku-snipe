export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="min-h-screen w-full flex-center bg-[#FFF5F5]">
        {children}
      </div>
    );
  }
  