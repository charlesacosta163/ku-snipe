import Navbar from "@/components/navbar";
import NavbarWrapper from "@/components/navbar-wrapper";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#FFF5F5] relative min-h-screen w-full flex gap-4 p-4">

      <div className="hidden md:block sticky top-4">
        <Sidebar />
      </div>
      
      <main className="flex-1 flex flex-col">
        <NavbarWrapper />
        <section className="flex-1 min-w-full max-w-full overflow-x-auto mt-4">{children}</section>
      </main>
    </div>
  );
}
