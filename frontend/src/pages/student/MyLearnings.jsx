import React from "react";
import CourseCard from "./CourseCard";
import { useLoadUserQuery } from "../../utils/api/authApi";

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);

const MyLearnings = () => {
  // const { data, isLoading } = useLoadUserQuery();
  // const myLearning = data?.user.enrolledCourses || [];
  const isLoading = false;
  const myLearning = [1, 2];

  return (
    <div className="w-full mx-auto my-10 md:px-36 px-8 pt-20">
      {/* md:pt-36 pt-20 px-7 md:px-0 space-y-7 */}
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2].map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearnings;
