import GoogleAdsense from "@/app/components/GoogleAdsense";

export default function NameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <div className="flex container mx-auto lg:gap-x-8">
  <div className="w-full lg:w-9/12">
  {children}
  </div>
  <div className="my-7 p-5 sticky top-0 bg-[#292C34] flex flex-row lg:w-3/12">
    <GoogleAdsense pId="3537170918649474" />
  </div>
  </div>
</>;
}