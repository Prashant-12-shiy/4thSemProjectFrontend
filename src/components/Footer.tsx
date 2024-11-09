"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const Footer = () => {
  const sections = [
    {
      title: "Resources",
      items: [
        { text: "Docs", link: "#" },
        { text: "Learn", link: "#" },
        { text: "Blog", link: "#" },
        { text: "Review", link: "#" },
      ],
    },
    {
      title: "More",
      items: [
        { text: "GitHub", link: "https://github.com/", target: "_blank" },
        { text: "Facebook", link: "https://facebook.com/", target: "_blank" },
        { text: "Team", link: "/team" },
        { text: "About Us", link: "#" },
      ],
    },
    {
      title: "Links",
      items: [
        { text: "Universities", link: "/university" },
        { text: "College", link: "/college" },
        { text: "Subjects", link: "#" },
        { text: "Notes", link: "#" },
      ],
    },
    {
      title: "Legal",
      items: [{ text: "Privacy Policy", link: "#" }],
    },
  ];

  return (
    <div>
      {/* <hr className="my-4 dark:bg-white bg-black border-black dark:border-white" /> */}
      <div className="flex items-start max-sm:grid max-sm:grid-cols-2 mt-10 max-sm:gap-7 max-sm:pl-9 justify-evenly bg-gray-200 pb-4">
        <>
          <Image
            src="/next.svg"
            alt="learnSpace"
            width={200}
            height={200}
            className="text-black mt-10"
          />

        </>

        {sections.map((section, index) => (
          <div key={index} className="mt-10">
            <h2 className="text-lg max-md:text-base mb-3 font-semibold   ">
              {section.title}
            </h2>
            <ul className="*:mb-2 text-sm ">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  {" "}
                  <Link href={item.link} target={item?.target} scroll={true}>
                    {item.text}{" "}
                  </Link>{" "}
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
      <p className="text-[#888] bg-gray-200 text-sm "> &copy; 2025 Prashant</p>

      {/* <hr className/>/=" dark:bg-white bg-black border-black dark:border-white border-opacity-40" /> */}
       
        </div>
  );
};

export default Footer;
