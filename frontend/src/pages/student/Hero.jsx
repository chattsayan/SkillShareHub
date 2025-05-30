import SearchBar from "@/components/SearchBar";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-b from-yellow-300/70">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center">
          <h1 className="md:text-[44px] text-[26px] relative font-bold text-gray-800 max-w-3xl mx-auto">
            Unlock your potential with learning paths built{" "}
            <span className="text-orange-600">for your goals.</span>
          </h1>

          <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
            We bring together world-class instructors, interactive content, and
            a supportive community to help you achieve your personal and
            professional goals.
          </p>

          <p className="md:hidden text-gray-500 max-w-sm mx-auto">
            We bring together world-class instructors to help you achieve your
            professional goals.
          </p>
          <SearchBar />

          <button className="text-gray-500 border border-gray-500/30 md:px-10 px-6 md:py-3 py-2 rounded-full cursor-pointer hover:border-gray-600/40 hover:text-gray-600">
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
