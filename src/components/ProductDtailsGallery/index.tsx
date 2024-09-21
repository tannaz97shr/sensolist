"use client";

import { Carousel, CustomFlowbiteTheme } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsGalleryProps {
  images: { imageURL: string; isCover: boolean }[];
}

export default function ProductDetailsGallery({
  images,
}: ProductDetailsGalleryProps) {
  const [currenSlide, setCurrentSlide] = useState(0);
  const customTheme: CustomFlowbiteTheme["carousel"] = {
    root: {
      base: "relative h-full w-full",
      leftControl:
        "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
      rightControl:
        "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-gray-800/50 dark:hover:bg-gray-800",
        on: "bg-gray-800",
      },
      base: "h-3 w-3 rounded-full",
      wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
    },
    item: {
      base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
      wrapper: {
        off: "w-full flex-shrink-0 transform cursor-default snap-center",
        on: "w-full flex-shrink-0 transform cursor-grab snap-center",
      },
    },
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
      icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
      snap: "snap-x",
    },
  };
  return (
    <div className="w-full flex mx-auto lg:mx-[unset]  lg:w-3/5">
      <div className="w-full flex aspect-square lg:aspect-auto 
      md:min-w-[480px] md:max-w-[567px]
        lg:min-w-[567px] lg:max-w-[480px]
         mx-auto md:mx-0 mt-2 mb-9 ">
        <div className="w-[160px] h-full hidden md:flex flex-col justify-start mr-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={` relative w-full h-[24%] border rounded-xl overflow-hidden mt-3
               ${
                 currenSlide === i
                   ? "border-secondary-main"
                   : "border-primary-tint-2"
               }`}
            >
              <Image
                alt="img"
                src={img.imageURL}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
        <Carousel
          theme={customTheme}
          onSlideChange={(index) => {
            setCurrentSlide(index);
          }}
          className="border rounded-xl overflow-hidden border-primary-tint-2"
        >
          {images.map((img, i) => (
            <div key={i} className=" relative w-full h-full">
              <Image
                alt="img"
                src={img.imageURL}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
