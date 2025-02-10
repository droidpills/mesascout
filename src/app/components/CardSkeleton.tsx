const FormSkeleton = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-full mx-auto animate-pulse">
        <div className="h-[400px] w-full bg-gray-300 rounded mb-4"></div>
        <div className="h-10 w-full bg-gray-300 rounded mb-4"></div>
        <div className="h-10 w-full bg-gray-300 rounded mb-4"></div>
        <div className="h-10 w-full bg-gray-300 rounded mb-4"></div>
        <div className="h-12 w-full bg-gray-300 rounded"></div>
      </div>
    );
  };
  
  export default FormSkeleton;
  