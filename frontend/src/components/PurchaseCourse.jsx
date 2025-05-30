import React from "react";
import { Button } from "./ui/button";

const PurchaseCourse = () => {
  const isLoading = false;
  return (
    <Button
      //   disabled={isLoading}
      //   onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default PurchaseCourse;
