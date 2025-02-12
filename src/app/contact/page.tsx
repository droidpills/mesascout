"use client"; // Garante que esse componente rode no lado do cliente

import { useEffect } from "react";
import FormSkeleton from "../components/CardSkeleton";


const Contact = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/49277401.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <section className="mt-4 h-screen relative">
        <div className="absolute -z-10 ml-3 w-[90%]"><FormSkeleton/> </div>
        <div
          className="hs-form-frame bg-white"
          data-region="na1"
          data-form-id="97762e00-2291-48ae-8d64-9e9ce394f79d"
          data-portal-id="49277401"
        ></div>
      </section>
    </div>
  );
};

export default Contact;
