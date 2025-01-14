import { useRef, useState } from "react";

export const Subscribe = () => {
  const [EmailInput, setEmailInput] = useState("");
  const InputRef = useRef<HTMLInputElement>(null);
  const HandleInput = (e:  React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = e.target;
    setEmailInput(value);
  
  };
  const DSend = (e: React.SyntheticEvent) => {
    e.preventDefault();
  
   
  };

  const InputF = () => {
    const emailInput = InputRef.current;
    const validEmails = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (validEmails.test(EmailInput)) {
      return ""
    } else {
     return emailInput?.setCustomValidity("Please Add a valid Email")
    }
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <h3 className="font-medium text-xl ">Subscribe now & get 20% off</h3>
      </div>
      <form
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6  pl-3 outline-none"
        onSubmit={DSend}
      >
        <input
          type="email"
          className=" sm:flex-1 outline-none border-2 w-full p-3"
          placeholder="Enter your Email"
          value={EmailInput}
          onChange={HandleInput}
          ref = {InputRef}
        />
        <button id="ButtonsAnimation" className="" type="submit" onClick={InputF}>Subscribe</button>
      </form>
    </>
  );
};
