import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "../../utils/api/authApi";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import CourseCard from "./CourseCard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { data, isLoading, error, refetch } = useLoadUserQuery();

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error: updateError,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (error?.status === 401) {
      toast.error("Please login to view your profile");
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name);
    }
  }, [data]);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Profile updated successfully");
    }
    if (isError) {
      toast.error(updateError?.data?.message || "Failed to update profile");
    }
  }, [updateUserData, isSuccess, isError, updateError]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load profile</p>
      </div>
    );
  }

  const user = data && data.user;
  console.log(user);

  // const enrolledCourses = user?.enrolledCourses || [];

  return (
    <div className="w-full mx-auto my-10 md:px-36 px-8 pt-20">
      <h1 className="font-bold text-2xl">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center justify-start md:items-start gap-8 my-5">
        <div>
          <img
            src={
              user?.photoUrl || "https://www.svgrepo.com/show/13656/user.svg"
            }
            alt={user?.name}
            className="h-24 w-24 md:h-32 md:w-32 mb-4 rounded-full object-cover"
          />
        </div>

        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.role?.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3 px-2 py-1 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label>Profile Photo</label>
                  <input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3 px-2 py-1 border border-gray-300 bg-gray-300 rounded-md"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled in any courses yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <CourseCard course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
