import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutUserMutation } from "../utils/api/authApi";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  // const user = true;

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User Logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="w-full flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b  border-b-gray-300 py-4 bg-white shadow-lg duration-300">
        <img
          src="/text-logo.png"
          alt="logo"
          className="w-28 lg:w-32 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Right section (Desktop & Mobile Shared Logic) */}
        {/* <div className="flex items-center gap-2 sm:gap-5 text-gray-500"> */}
        <div className="flex items-center gap-4 text-gray-500">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer">
                  <img
                    src={
                      user?.photoUrl ||
                      "https://www.svgrepo.com/show/13656/user.svg"
                    }
                    alt=""
                    className="w-9 h-9 rounded-full"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to={"profile"}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={"my-learnings"}>My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  {/* {user?.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/instructor/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )} */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-5 text-gray-500">
                <button
                  // onClick={onOpenLogin}
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-orange-600 transition-all duration-200"
                >
                  Sign In
                </button>
              </div>

              <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
                <button
                  // onClick={onOpenLogin}
                  onClick={() => navigate("/login")}
                  className="cursor-pointer"
                >
                  <img
                    src="https://www.svgrepo.com/show/13656/user.svg"
                    alt=""
                    className="w-9 h-9"
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
