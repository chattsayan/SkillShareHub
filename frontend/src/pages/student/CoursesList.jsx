import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "./CourseCard";
import { useGetPublishedCourseQuery } from "@/utils/api/courseApi";

const ShimmerUI = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};

const CoursesList = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  console.log(data);

  if (isError) return <h1>Some error occurred while fetching courses.</h1>;

  return (
    <div>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Course List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ShimmerUI key={index} />
              ))
            : data?.courses &&
              data.courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
