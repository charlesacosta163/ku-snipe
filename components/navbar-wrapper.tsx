import { auth } from "@/lib/auth";
import Navbar from "./navbar";
import { User as UserInterface } from "@/types/index";

const NavbarWrapper = async () => {
  const session = await auth();

  if (!session?.user) return null;

  const user = session.user as UserInterface;

  return <Navbar user={user} />;
};

export default NavbarWrapper;