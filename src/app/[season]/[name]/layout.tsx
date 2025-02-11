
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
  <div className="my-7  sticky top-0  h-screen bg-[#292C34] flex flex-row lg:w-3/12"></div>
  </div>
</>;
}