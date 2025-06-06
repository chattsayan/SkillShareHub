import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import PurchaseCourse from "@/components/PurchaseCourse";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  //   const { data, isLoading, isError } =
  //     useGetCourseDetailWithStatusQuery(courseId);

  const purchased = true;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5 pt-18">
      <div className="bg-[#58d168] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {/* {course?.courseTitle} */}
            Course
          </h1>
          <p className="text-base md:text-lg">Course Sub-title</p>
          <p>
            Created By{" "}
            <span className="text-[#1423f3] underline italic">
              {/* {course?.creator.name} */}
              Sayan C
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated 2025-10-20 </p>
            {/**{course?.createdAt.split("T")[0]} */}
          </div>
          <p>Students enrolled: 5</p> {/**{course?.enrolledStudents.length} */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          {/* <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course.description }}
          /> */}

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>
            {/* <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent> */}
          </Card>
        </div>

        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  //   url={course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1>Lecture title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <PurchaseCourse courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
