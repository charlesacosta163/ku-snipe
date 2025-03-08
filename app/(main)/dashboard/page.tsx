import { auth } from "@/lib/auth"
import Image from "next/image";
import Link from "next/link";
import NotLoggedIn from "@/components/not-logged-in";
export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) return <NotLoggedIn />    ;

  const {name, email, image} = session?.user

  return (
    <div className="w-full h-full flex-center">

      <div className="flex flex-col gap-4 mb-10">

      <header className="self-center">
        <h1 className="font-bold text-[3rem] text-gray-700 tracking-tight">
          Hello {name?.split(" ")[0] || "User"}! 
        </h1>
        <p className="text-sm text-gray-500 text-center">Welcome to your Dashboard</p>
      </header>
      <section className="flex-1 flex flex-wrap gap-4 justify-center md:justify-start">
        <div className="flex flex-col w-[300px] rounded-[20px] border-2 border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1570070595458-307529e70001?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-[200px] rounded-[20px] shadow object-cover object-center"
          />

          <div className="p-4 pt-2 flex flex-col gap-3 items-center text-center">
            <div className="font-black text-[2rem] tracking-tight text-blue-400">
              Snipe
            </div>
            <p className="text-sm font-semibold text-gray-600">
              Start monitoring a new course. Get notified instantly when a seat becomes available in your desired class.
            </p>

            <Link
              href="/search"
              className="px-4 py-2 rounded-lg text-xl font-bold bg-blue-700 hover:bg-blue-800 text-white w-full"
            >
              New Snipe
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-[300px] rounded-[20px] border-2 border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1504173010664-32509aeebb62?q=80&w=3227&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-[200px] rounded-[20px] shadow object-cover object-top"
          />

          <div className="p-4 pt-2 flex flex-col gap-3 items-center text-center">
            <div className="font-black text-[2rem] tracking-tight text-purple-400">
              Manage
            </div>

            <p className="text-sm font-semibold text-gray-600">
              View and manage your active course snipes. Check status or remove courses
            </p>

            <Link href="/manage" className="px-4 py-2 rounded-lg text-xl font-bold bg-gray-100 hover:bg-gray-200 w-full">
              Manage Snipe
            </Link>
          </div>
        </div>
      </section>


      </div>
    </div>
  );
}
