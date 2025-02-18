import Image from "next/image";
import bannertop from "../../../../public/images/banners/banner-top.png";

export default function NameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <div className="mx-auto mt-7 justify-center flex">
      <a href="https://www.youtube.com/@mesascout?sub_confirmation=1">
        <Image src={bannertop} width={970} height={250} alt="Banner Youtube" />
      </a>
    </div>
    <div className="flex mx-auto lg:container lg:gap-x-8">
      <div className="w-full mx-auto w-12/12 lg:w-9/12">
        {children}
      </div>
      <div className="my-7 p-5 sticky top-0 bg-[#292C34] hidden lg:flex lg:flex-row lg:w-3/12">
      </div>
    </div>
  </>;
}