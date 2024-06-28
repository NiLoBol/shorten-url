"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import LinkComponent from "./components/LinkComponent";
import { link } from "fs";
type Linktype = {
  OriginLink: string;
  ShortenLink: string;
};
export default function Home() {
  const [getinput, setinput] = useState<boolean>(true);
  const ref = useRef<HTMLInputElement | null>(null);
  const [Link, setLink] = useState<Linktype[]>();
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
              setinput(true)
              return [Newlink];
            } else {
              setinput(true)
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

  return (
    <main className="">
      <header className="container mx-auto flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold">Shortly</h1>
        <nav className="flex space-x-6">
          <a href="#" className="text-gray-500">
            Features
          </a>
          <a href="#" className="text-gray-500">
            Pricing
          </a>
          <a href="#" className="text-gray-500">
            Resources
          </a>
        </nav>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-500 px-4 py-2">
            Login
          </a>
          <a href="#" className="bg-teal-500 text-white px-4 py-2 rounded">
            Sign Up
          </a>
        </div>
      </header>

      <section className="container mx-auto flex flex-row mt-10">
        <div className="basis-1/2">
          <h2 className="text-5xl font-bold">More than just shorter links</h2>
          <p className="mt-4 text-lg text-gray-500">
            Build your brand’s recognition and get detailed insights on how your
            links are performing.
          </p>
          <button className="bg-teal-500 text-white px-6 py-3 rounded mt-6">
            Get Started
          </button>
        </div>
        <div className="basis-1/2">
          <Image
            alt="table"
            src="/images/illustration-working.svg"
            width={500}
            height={500}
          ></Image>
        </div>
      </section>

      <section className="container mx-auto mt-20 bg-shorten bg-DarkViolet py-10 rounded-lg text-center">
        {getinput ? (
          <input
            ref={ref}
            type="text"
            className="px-4 mx-10 py-3 w-2/3 text-lg rounded-l"
            placeholder="Shorten a link here..."
          />
        ) : (
          <input
            ref={ref}
            type="text"
            className="px-4 mx-10 py-3 w-2/3 text-lg rounded-l border-2 border-Red placeholder:text-Red"
            placeholder="Shorten a link here..."
          />
        )}
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-teal-500 text-white px-6 py-3 text-lg rounded-r"
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

      <section className="container mx-auto mt-20 text-center">
        <h3 className="text-3xl font-bold">Advanced Statistics</h3>
        <p className="mt-4 text-lg text-gray-500">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>

        <div className="flex justify-around mt-10">
          <div className="w-1/4 text-left bg-white p-6 rounded shadow-lg">
            <h4 className="text-xl font-bold">Brand Recognition</h4>
            <p className="mt-4 text-gray-500">
              Boost your brand recognition with each click. Generic links don’t
              mean a thing. Branded links help instill confidence in your
              content.
            </p>
          </div>
          <div className="w-1/4 text-left bg-white p-6 rounded shadow-lg">
            <h4 className="text-xl font-bold">Detailed Records</h4>
            <p className="mt-4 text-gray-500">
              Gain insights into who is clicking your links. Knowing when and
              where people engage with your content helps inform better
              decisions.
            </p>
          </div>
          <div className="w-1/4 text-left bg-white p-6 rounded shadow-lg">
            <h4 className="text-xl font-bold">Fully Customizable</h4>
            <p className="mt-4 text-gray-500">
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 text-center bg-boost bg-cover bg-DarkViolet 2xl:p-16 p-10">
        <div className="text-center text-5xl font-bold mb-10 text-white ">
          Boost your links today
        </div>
        <button className="bg-teal-500 text-white px-6 py-3 rounded mt-4">
          Get Started
        </button>
      </section>

      <footer className=" bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-bold">Shortly</h3>
            </div>
            <div className="flex space-x-10">
              <div>
                <h4 className="font-bold">Features</h4>
                <ul className="mt-4 space-y-2">
                  <li>Link Shortening</li>
                  <li>Branded Links</li>
                  <li>Analytics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">Resources</h4>
                <ul className="mt-4 space-y-2">
                  <li>Blog</li>
                  <li>Developers</li>
                  <li>Support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold">Company</h4>
                <ul className="mt-4 space-y-2">
                  <li>About</li>
                  <li>Our Team</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-500">
              Challenge by{" "}
              <a
                href="https://www.frontendmentor.io?ref=challenge"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Frontend Mentor
              </a>
              . Coded by{" "}
              <a href="#" className="underline">
                Your Name Here
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
