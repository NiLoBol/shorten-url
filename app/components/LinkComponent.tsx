import React, { useState } from 'react';

type propstype ={
    OriginLink: string,
    ShortenLink:string,
}
const LinkComponent = (props:propstype) => {
    const [buttonText, setButtonText] = useState('copy');
    const [buttonColor, setButtonColor] = useState('bg-Cyan');
  
    const handleCopy = () => {
      const textToCopy = props.ShortenLink;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setButtonText('copied!');
        setButtonColor('bg-DarkViolet');
      });
    };
  
  return (
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-sm">
      <a href={props.OriginLink} className="">
        {props.OriginLink}
      </a>
      <div className="flex items-center">
        <a href="https://rel.ink/k4lKyk" className="text-Cyan mr-4">
         {props.ShortenLink}
        </a>
        <button
          className={`px-4 py-2 text-white rounded-md  ${buttonColor}`}
          onClick={handleCopy}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LinkComponent;
