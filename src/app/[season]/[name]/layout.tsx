import Image from "next/image";
import bannertop from "../../../../public/images/banners/banner-top.png";
import bannerleft from "../../../../public/images/banners/banner-left.png";
import bannermobile from "../../../../public/images/banners/banner-mobile.gif";

export default function NameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <div className="mt-7 mx-auto flex justify-center lg:container">
      <a href="https://www.youtube.com/@mesascout?sub_confirmation=1" target="_blank" className="hidden lg:block">
        <Image src={bannertop} width={1536} height={250} alt="Banner Youtube" />
      </a>
      <a href="https://www.youtube.com/@mesascout?sub_confirmation=1" target="_blank" className="lg:hidden">
        <Image src={bannermobile} width={300} height={250} alt="Banner Youtube" />
      </a>
    </div>
    <div className="flex mx-auto lg:container lg:gap-x-8">
      <div className="w-full mx-auto w-12/12 lg:w-9/12">
        {children}
      </div>

      <div className="my-7 sticky top-0 hidden lg:flex lg:flex-row lg:w-3/12">
        <a href="https://www.instagram.com/mesascout/#" target="_blank">
          <Image src={bannerleft} width={380} height={850} alt="Banner Youtube" />
        </ a>
      </div>
    </div>
  </>;
}