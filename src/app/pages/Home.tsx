"use client"
import Header from "@/components/Header";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { features, pricings } from "@/staticdata";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="flex justify-around px-20 max-md:px-6 m-auto h-[90vh] items-center">
        <div>
          <h1 className="text-5xl font-semibold mb-4 max-md:text-2xl ">
            Student Management System
          </h1>
          <p>Simplify, Innovate, Educate</p>
        </div>
        <Image src="/heroimg.png" alt="heroImg" height={360} width={360} className="max-md:h-[200px] max-md:w-[250px] max-sm:h-[150px] max-sm:w-[200px]" />
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-center mb-10">
          Key Features
        </h2>
        <div className="grid grid-cols-3 gap-10 mx-10 justify-items-center  align-middle max-md:grid-cols-2 max-sm:grid-cols-1">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="w-[250px] h-[300px] shadow-lg flex flex-col rounded-lg items-center pt-6 px-3 hover:scale-105 transition-all duration-300 "
              >
                <Image
                  src={feature.image}
                  height={242}
                  width={175}
                  alt={feature.title}
                />
                <h3 className="font-semibold mt-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-sm text-center mt-4">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="min-h-[100vh] flex flex-col justify-center">
        <h2 className="font-semibold text-3xl text-center mt-10 mb-4">Pricings</h2>
        <div className="flex gap-6 justify-center max-md:flex-col max-md:items-center">
          {pricings.map((pricing, index) => {
            return (
            <div key={index} className="border border-black shadow-sm rounded-md px-8 py-3">
                <h3 className="text-2xl font-semibold py-3">{pricing.title}</h3>
                <p className="font-semibold">{pricing.capacity}</p>
                <p className="text-sm font-light mt-3">{pricing.subtitle}</p>
                <ol className="text-sm pl-6 list-disc font-light mb-3">
                    {pricing.features.map((feature, index) => (
                        <li key={index}> {feature}</li>
                    ))}
                </ol>
                <h2 className="font-semibold text-xl mb-3">{pricing.price}</h2>
                <Button>Subscribe</Button>
            </div>
            )
          })}
        </div>
      </div>
      
      <Footer/>
    </div>
  );
};

export default Home;
