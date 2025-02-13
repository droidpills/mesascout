import GoogleAdsense from "@/app/components/GoogleAdsense";

export default function NameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <div className="flex mx-auto lg:container lg:gap-x-8">
  <div className="w-full mx-auto w-12/12 lg:w-9/12">
  {children}
  </div>
  <div className="my-7 p-5 sticky top-0 bg-[#292C34] hidden lg:flex lg:flex-row lg:w-3/12">
    <GoogleAdsense  />
  </div>
  </div>
</>;
}