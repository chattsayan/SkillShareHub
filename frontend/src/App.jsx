import "./App.css";
import Login from "./pages/Login";
// import Navbar from "./components/Navbar";
// import { useState } from "react";
import Hero from "./pages/student/Hero";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import CoursesList from "./pages/student/CoursesList";
import MyLearnings from "./pages/student/MyLearnings";
import Profile from "./pages/student/Profile";
import Dashboard from "./pages/instructor/Dashboard";
import CourseTable from "./pages/instructor/course/CourseTable";
import Sidebar from "./pages/instructor/Sidebar";
import AddCourse from "./pages/instructor/course/AddCourse";
import EditCourse from "./pages/instructor/course/EditCourse";
import CreateLecture from "./pages/instructor/lecture/CreateLecture";
import EditLecture from "./pages/instructor/lecture/EditLecture";
import CourseCard from "./pages/student/CourseCard";
import CourseDetails from "./pages/student/CourseDetails";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            <CoursesList />
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learnings",
        element: <MyLearnings />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "course-detail/:courseId",
        element: <CourseDetails />,
      },

      // instructor routes
      {
        path: "instructor",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/add-course",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  // const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
