"use client"; // Required for interactivity
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Header from "@/components/Header";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-10">
        {/* Heading */}
        <h1 className="text-center font-semibold text-4xl md:text-5xl mt-10 text-blue-900">
          About Us
        </h1>

        {/* Introduction Section */}
        <div className="mt-8 max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-700">
            Welcome to our fourth-semester project, a collaborative endeavor
            developed by two dedicated students from the Bachelor Of Computer
            Science Department. Our project is a comprehensive student management
            system designed to streamline academic tracking and management,
            combining both front-end and back-end development skills to create a
            seamless and user-friendly experience.
          </p>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-3xl text-center font-bold text-blue-900">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mx-4">
            {/* Prashant Thapa Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <h3 className="text-2xl font-semibold text-blue-900">
                Prashant Thapa -{" "}
                <span className="text-red-500">Backend Developer</span>
              </h3>
              <p className="mt-4 text-gray-700">
                Prashant is responsible for managing the server-side logic,
                database integration, and API development. His expertise ensures
                that the project has a robust foundation and efficient data
                handling, making the system reliable and responsive.
              </p>
            </div>

            {/* Aashish Tamang Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
              <h3 className="text-2xl font-semibold text-blue-900">
                Aashish Tamang -{" "}
                <span className="text-red-500">Frontend Developer</span>
              </h3>
              <p className="mt-4 text-gray-700">
                Aashish brings the user interface to life, creating an intuitive
                and visually engaging design that allows users to interact
                effortlessly with the system. His focus on user experience
                ensures that the interface is clean, responsive, and easy to
                navigate.
              </p>
            </div>
          </div>
        </div>

        {/* Drawer for Additional Information */}
        <div className="mt-12 text-center">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                Learn More About Our Project
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-md mx-auto">
              <DrawerHeader>
                <DrawerTitle className="text-2xl font-bold text-blue-900">
                  Our Project Journey
                </DrawerTitle>
                <DrawerDescription className="text-gray-700">
                  This project has been a learning journey and a valuable
                  hands-on experience that has furthered our knowledge in
                  full-stack development. Thank you for visiting our project! We
                  hope it demonstrates our dedication and the technical skills
                  we’ve developed during our studies.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  We aim to deliver a well-rounded project that showcases our
                  skills and provides a solution to real-world challenges in
                  academic management.
                </p>
              </div>
              <DrawerClose asChild>
                <Button variant="outline" className="mt-4 w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;