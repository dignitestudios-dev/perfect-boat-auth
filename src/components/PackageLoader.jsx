import React from 'react'

const PackageLoader = () => {
  return (
    <div className="w-auto grid grid-cols-1 justify-center items-center mt-8 gap-6">
    <div className="w-[280px] md:w-[420px] xl:w-[440px] h-auto rounded-[20px] xl:rounded-[24px] bg-[#1A293D] p-6 md:p-8 flex flex-col gap-6 justify-start items-center animate-pulse">
      
      {/* Skeleton for subscription name */}
      <span className="w-auto h-[36px] md:h-[42px] bg-gray-700 rounded-full animate-pulse"></span>

      
        <span className="w-[128px] h-[36px] md:h-[42px] 
             tracking-[3px] font-semibold px-3 md:px-4 rounded-full flex items-center 
             justify-center bg-gray-700 animate-pulse"></span>
      
        <span className="w-[228px] h-[36px] md:h-[42px] 
             tracking-[3px] font-semibold px-3 md:px-4 rounded-full flex items-center 
             justify-center bg-gray-700 animate-pulse"></span>
      
      {/* Skeleton for price */}
      <div className="w-auto relative flex gap-2 justify-start items-center">
        <span className="absolute top-2 -left-4 bg-gray-700 rounded-full my-1 w-5 h-5 animate-pulse"></span>
        <span className="w-[100px] md:w-[120px] xl:w-[140px] h-[48px] md:h-[60px] xl:h-[72px] bg-gray-700 mt-2 rounded animate-pulse"></span>
        <span className="w-[40px] h-4 bg-gray-700 rounded animate-pulse"></span>
      </div>
      
      {/* Skeleton for button */}
      <div className="w-[100px] md:w-[110px] xl:w-[126px] h-[38px] md:h-[40px] xl:h-[44px] my-4 bg-gray-700 rounded-full animate-pulse"></div>
      
      {/* Skeleton for features list */}
      <ul className="w-full px-4 md:px-6 xl:px-8 flex flex-col gap-4">
        {Array(6).fill(0).map((_, index) => (
          <li key={index} className="w-full h-4 bg-gray-700 rounded animate-pulse my-2"></li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default PackageLoader