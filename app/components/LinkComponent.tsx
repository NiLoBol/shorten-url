import React, { useState } from "react";

type propstype = {
  OriginLink: string;
  ShortenLink: string;
};
const LinkComponent = (props: propstype) => {
  const [buttonText, setButtonText] = useState("copy");
  const [buttonColor, setButtonColor] = useState("bg-Cyan");

  const handleCopy = () => {
    const textToCopy = props.ShortenLink;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setButtonText("copied!");
      setButtonColor("bg-DarkViolet");
    });
  };

  return (
    <div className="flex max-md:block items-center justify-between p-4 border border-gray-300 rounded-md shadow-sm max-md:mx-6">
      <div className="lg:p-3 lg:max-w-[70%] p-0 max-md:my-5 max-w-full  break-words ">
        <a
          href={props.OriginLink}
          target="_blank"
          className="max-md:block font-medium text-xl max-md:text-lg"
        >
          {props.OriginLink}
        </a>
      </div>

      <hr className="md:hidden" />
      <div className="flex max-md:block items-center max-md:mt-5 ">
        <a
          href={props.ShortenLink}
          target="_blank"
          className="text-Cyan text-xl max-md:text-lg font-medium mr-4 "
        >
          {props.ShortenLink}
        </a>
        <button
          className={`px-4 py-2 text-white font-medium rounded-md max-md:mt-5 w-full text-xl  max-md:text-lg ${buttonColor}`}
          onClick={handleCopy}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LinkComponent;
