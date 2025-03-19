"use client";
import Header from "@/components/Header";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { features, pricings } from "@/staticdata";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-20 h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white text-center md:text-left">
            <h1 className="text-5xl font-bold mb-4 max-md:text-3xl">
              Student Management System
            </h1>
            <p className="text-lg mb-8 max-md:text-sm">
              Simplify, Innovate, Educate
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Get Started
            </Button>
          </div>
          <Image
            src="/heroimg.png"
            alt="heroImg"
            height={400}
            width={400}
            className="mt-8 md:mt-0 max-md:h-[200px] max-md:w-[250px] max-sm:h-[150px] max-sm:w-[200px]"
          />
        </div>
      </div>

      {/* Key Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center">
                <Image
                  src={feature.image}
                  height={100}
                  width={100}
                  alt={feature.title}
                  className="mb-6"
                />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Pricing Plans
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricings.map((pricing, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pricing.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {pricing.capacity}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  {pricing.subtitle}
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-6 mt-4">
                  {pricing.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6">
                  {pricing.price}
                </h2>
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white">
                  Subscribe
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;