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
    <section className="h-full min-h-screen relative overflow-hidden w-full mx-auto mt-7">
      <h1 className="text-slate-600 pl-5 text-2xl sm:text-4xl leading-snug animate-fade-in">Preencha o formulário abaixo ou entre em contato direto pelo email: <span className="font-bold">marco@droidpills.com</span> </h1>
      <div className="absolute -z-10 w-full max-w-[90%]">
        <FormSkeleton />
      </div>
      <div
        className="hs-form-frame bg-white w-full mx-auto"
        data-region="na1"
        data-form-id="97762e00-2291-48ae-8d64-9e9ce394f79d"
        data-portal-id="49277401"
      ></div>
    </section>

  );
};

export default Contact;
