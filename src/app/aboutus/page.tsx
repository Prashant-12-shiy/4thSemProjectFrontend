import Header from "@/components/Header";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <h1 className="text-center font-semibold text-3xl mt-10">About Us</h1>

      <div>
        <p className="mx-20 mt-4">
          Welcome to our fourth-semester project, a collaborative endeavor
          developed by two dedicated students from the Bachelor Of Computer
          Science Department. Our project is a comprehensive student management
          system designed to streamline academic tracking and management,
          combining both front-end and back-end development skills to create a
          seamless and user-friendly experience.
        </p>
      </div>

      <div>
        <h2 className="text-2xl text-center mt-10">Our Team</h2>
        <div className="flex *:border *:border-black/50 *:p-4 *:rounded-sm gap-5 mx-32">
          <div>
            <h3 className="text-lg py-2">
              Prashant Thapa -{" "}
              <span className="text-red-500">Backend Developer</span>
            </h3>
            <p>
              Prashant is responsible for managing the server-side logic,
              database integration, and API development. His expertise ensures
              that the project has a robust foundation and efficient data
              handling, making the system reliable and responsive.
            </p>
          </div>

          <div>
            <h3 className="text-lg py-2">
              Aashish Tamang -{" "}
              <span className="text-red-500"> Frontend Developer</span>
            </h3>
            <p>
              Aashish brings the user interface to life, creating an intuitive
              and visually engaging design that allows users to interact
              effortlessly with the system. His focus on user experience ensures
              that the interface is clean, responsive, and easy to navigate.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm mx-32 text-blue-600">
        We aim to deliver a well-rounded project that showcases our skills and
        provides a solution to real-world challenges in academic management.
        This project has been a learning journey and a valuable hands-on
        experience that has furthered our knowledge in full-stack development.
        Thank you for visiting our project! We hope it demonstrates our
        dedication and the technical skills we’ve developed during our studies.
      </p>
    </div>
  );
};

export default page;
