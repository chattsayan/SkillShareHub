import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/utils/api/courseApi";
import { Edit, Loader2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCreatorCourseQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading courses. Please try again.
      </div>
    );
  }

  if (!data?.courses || data.courses.length === 0) {
    return (
      <div className="pt-20">
        <Button className="mb-6" onClick={() => navigate("add-course")}>
          Create a new course
        </Button>
        <div className="text-center text-gray-500 mt-8">
          No courses found. Create your first course!
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Button className="mb-6" onClick={() => navigate("add-course")}>
        Create a new course
      </Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                {" "}
                <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>{" "}
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                  className="cursor-pointer"
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
