"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import LinkComponent from "./components/LinkComponent";
import {} from "@image/icon-brand-recognition.svg";
import {} from "@image/icon-detailed-records.svg";
import {} from "@image/icon-fully-customizable.svg";
import { link } from "fs";
import Icon from "./components/Icon";
type Linktype = {
  OriginLink: string;
  ShortenLink: string;
};
export default function Home() {
  const [getinput, setinput] = useState<boolean>(true);
  const ref = useRef<HTMLInputElement | null>(null);
  const [Link, setLink] = useState<Linktype[]>();
  const [menu, setmenu] = useState<boolean>(false);
  const handleSubmit = async () => {
    if (ref.current) {
      const url = ref.current.value;
      if (!url) {
        alert("Please enter a link to shorten.");
        setinput(false);
        return;
      }
      try {
        const response = await fetch("/api/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (data.result_url) {
          const Newlink: Linktype = {
            OriginLink: ref.current.value,
            ShortenLink: data.result_url,
          };
          setLink((prev) => {
            if (prev == undefined) {
              setinput(true);
              return [Newlink];
            } else {
              setinput(true);
              return [...prev, Newlink];
            }
          });
        } else {
          alert("Failed to shorten URL");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while shortening the URL");
      }
    }
  };
  const menubutton = (): void => {
    setmenu(!menu);
    console.log(menu);
  };
  return (
    <main className="">
      <header className="container mx-auto flex justify-between items-center py-6 max-md:px-10">
        <h1 className="text-3xl font-bold cursor-pointer">Shortly</h1>
        <nav className="flex space-x-6 max-md:hidden ">
          <a
            href="#"
            className="text-GrayishViolet font-bold hover:text-black cursor-pointer"
          >
            Features
          </a>
          <a
            href="#"
            className="text-GrayishViolet font-bold hover:text-black cursor-pointer"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-GrayishViolet font-bold hover:text-black cursor-pointer"
          >
            Resources
          </a>
        </nav>
        <div className="flex space-x-4 max-md:hidden">
          <a
            href="#"
            className="text-GrayishViolet font-bold hover:text-black cursor-pointer px-4 py-2"
          >
            Login
          </a>
          <a
            href="#"
            className="bg-Cyan font-bold hover:brightness-110 text-white px-4 py-2 rounded"
          >
            Sign Up
          </a>
        </div>
        <div className="flex md:hidden">
          <img
            onClick={menubutton}
            src="images/menu.svg"
            className="w-8 h-8"
            alt=""
          />
        </div>
      </header>
      {menu ? (
        <div className="mx-10 bg-DarkViolet p-5 rounded-xl text-white text-center font-5xl ">
          <a
            href="#"
            className="block my-5  font-bold hover:text-black cursor-pointer"
          >
            Features
          </a>
          <a
            href="#"
            className="block my-5  font-bold hover:text-black cursor-pointer"
          >
            Pricing
          </a>
          <a
            href="#"
            className="block my-5  font-bold hover:text-black cursor-pointer"
          >
            Resources
          </a>
          <hr></hr>
          <a
            href="#"
            className="block my-5  font-bold hover:text-black cursor-pointer px-4 py-2"
          >
            Login
          </a>
          <a
            href="#"
            className="block my-5 bg-Cyan font-bold hover:brightness-110 text-white px-4 py-2 rounded"
          >
            Sign Up
          </a>
        </div>
      ) : (
        ""
      )}
      <section className="overflow-hidden relative">
        <div className="container mx-auto flex flex-row mt-10 max-md:flex-col-reverse  ">
          <div className="basis-3/5 my-20">
            <h2 className="lg:text-7xl text-5xl max-md:text-center font-bold max-md:mx-12 max-md:text-3xl">
              More than just shorter links
            </h2>
            <p className="mt-4 max-md:text-center text-lg text-GrayishViolet max-md:mx-6">
              Build your brand’s recognition and get detailed insights on how
              your links are performing.
            </p>
            <button className="bg-Cyan max-md:mx-auto max-md:block hover:brightness-110 text-white px-6 py-3 rounded-3xl mt-6 cursor-pointer">
              Get Started
            </button>
          </div>
          <div className="basis-2/5  ">
            <Image
              alt="table"
              className="lg:absolute -right-32 w-[600px] h-auto relative max-md:-right-12 "
              src="/images/illustration-working.svg"
              width={0}
              height={0}
            ></Image>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-20 max-md:mt-0 max-md:bg-shorten-m bg-cover bg-no-repeat max-md:bg-[30px_-30px] bg-shorten bg-DarkViolet py-10 max-md:py-7 rounded-lg text-center max-md:w-10/12 ">
        {getinput ? (
          <input
            ref={ref}
            type="text"
            className="px-4 mx-10 py-3 w-2/3 text-lg rounded-l max-md:w-10/12 max-md:mx-0 max-md:mb-5"
            placeholder="Shorten a link here..."
          />
        ) : (
          <input
            ref={ref}
            type="text"
            className="px-4 mx-10 py-3 w-2/3 text-lg rounded-l border-2 
            border-Red placeholder:text-Red max-md:w-10/12 max-md:mx-0"
            placeholder="Shorten a link here..."
          />
        )}
        {getinput ? (
          ""
        ) : (
          <div className="text-left ps-6 pb-5 text-Red"> please add a link</div>
        )}
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-Cyan hover:brightness-110 text-white px-6 py-3 text-lg rounded-r max-md:w-10/12 "
        >
          Shorten It!
        </button>
      </section>

      {Link?.map((data: Linktype) => {
        return (
          <div className="container mx-auto my-10">
            <LinkComponent
              OriginLink={data.OriginLink}
              ShortenLink={data.ShortenLink}
            />
          </div>
        );
      })}

      <section className="container mx-auto mt-20 text-center ">
        <h3 className="text-3xl font-bold max-md:text-2xl">
          Advanced Statistics
        </h3>
        <p className="mt-4 mx-6 text-lg text-GrayishViolet">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>

        <div className="flex max-md:block justify-around flex-row flex-wrap mt-10 lg:h-[400px] max-md:mb-32">
          <hr className="border-[6px] border-Cyan basis-8/12 mx-32 relative top-60" />
          <div className="w-1/4 max-md:w-5/6 max-md:mx-auto text-left bg-white p-6 rounded shadow-lg relative lg:h-[250px] h-[280px] top-0">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-20 h-20 rounded-full bg-DarkViolet border-8 border-DarkViolet ">
                <img
                  className="p-3"
                  alt="logo"
                  src="images/icon-brand-recognition.svg"
                ></img>
              </div>
            </div>

            <h4 className="text-xl mt-16 font-bold -top-6 relative max-md:mt-16  max-md:mb-3">
              Brand Recognition
            </h4>
            <p className="mt-4 text-GrayishViolet -top-4 relative">
              Boost your brand recognition with each click. Generic links don’t
              mean a thing. Branded links help instill confidence in your
              content.
            </p>
          </div>
          <div className="w-1/4 max-md:w-5/6 max-md:mx-auto text-left bg-white p-6 rounded shadow-lg relative lg:h-[250px] h-[280px] top-12">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-20 h-20 rounded-full bg-DarkViolet border-8 border-DarkViolet ">
                <img
                  className="p-3"
                  alt="logo"
                  src="images/icon-detailed-records.svg"
                ></img>
              </div>
            </div>
            <h4 className="text-xl mt-16 font-bold -top-6 relative max-md:mt-16  max-md:mb-3">
              Detailed Records
            </h4>
            <p className="mt-4 text-GrayishViolet -top-4 relative">
              Gain insights into who is clicking your links. Knowing when and
              where people engage with your content helps inform better
              decisions.
            </p>
          </div>
          <div className="w-1/4 max-md:w-5/6 max-md:mx-auto text-left bg-white p-6 rounded shadow-lg relative lg:h-[250px] h-[280px] top-24">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-20 h-20 rounded-full bg-DarkViolet border-8 border-DarkViolet ">
                <img
                  className="p-3"
                  alt="logo"
                  src="images/icon-fully-customizable.svg"
                ></img>
              </div>
            </div>
            <h4 className="text-xl mt-16 font-bold -top-6 relative max-md:mt-16  max-md:mb-3">
              Fully Customizable
            </h4>
            <p className="mt-4 text-GrayishViolet -top-4 relative">
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 text-center bg-boost bg-cover bg-DarkViolet 2xl:p-16 p-10">
        <div className="text-center text-5xl max-md:text-xl font-bold lg:mb-10 max-md:mt-2 text-white ">
          Boost your links today
        </div>
        <button className="bg-Cyan hover:brightness-110 text-white px-6 py-3 rounded-3xl mt-4 cursor-pointer">
          Get Started
        </button>
      </section>

      <footer className="bg-VeryDarkViolet text-white py-10 max-md:text-center">
        <div className="container mx-auto px-4 pt-8">
          <div className="flex flex-row max-md:flex-col ">
            <div className="basis-4/12 max-md:basis-full ">
              <h3 className="text-4xl font-bold">Shortly</h3>
            </div>
            <div className="basis-5/12 mt-10 max-md:basis-full">
              <div className="flex max-md:flex-col lg:space-x-10 ">
                <div>
                  <h4 className="text-xl font-bold -top-6 relative max-md:mt-10 max-md:mb-3">
                    Features
                  </h4>
                  <ul className="lg:mt-4 mt-0 space-y-2 -top-4 relative">
                    <li className="hover:fill-Cyan">Link Shortening</li>
                    <li className="hover:fill-Cyan">Branded Links</li>
                    <li className="hover:fill-Cyan">Analytics</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold -top-6 relative max-md:mt-10 max-md:mb-3">
                    Resources
                  </h4>
                  <ul className="lg:mt-4 mt-0 space-y-2 -top-4 relative">
                    <li className="hover:fill-Cyan">Blog</li>
                    <li className="hover:fill-Cyan">Developers</li>
                    <li className="hover:fill-Cyan">Support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold -top-6 relative max-md:mt-10 max-md:mb-3">
                    Company
                  </h4>
                  <ul className="lg:mt-4 mt-0 space-y-2 -top-4 relative">
                    <li className="hover:fill-Cyan">About</li>
                    <li className="hover:fill-Cyan">Our Team</li>
                    <li className="hover:fill-Cyan">Careers</li>
                    <li className="hover:fill-Cyan">Contact</li>
                  </ul>
                </div>
              </div>
            </div>
            <Icon></Icon>
          </div>
          <div className="mt-10 text-center">
            <p className="text-GrayishViolet">
              Challenge by{" "}
              <a
                href="https://www.frontendmentor.io?ref=challenge"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Frontend Mentor
              </a>
              . Coded by{"  "}
              <a
                target="_blank"
                href="https://www.frontendmentor.io/profile/NiLoBol"
                className="underline"
              >
                NiLoBol
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
