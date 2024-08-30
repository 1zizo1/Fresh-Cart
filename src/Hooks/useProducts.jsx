import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import React from 'react'
// import { ClimbingBoxLoader } from 'react-spinners';

export default function useProducts() {
    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      }
      let responseObject = useQuery({
        queryKey: ["recentProducts"],
        queryFn: getRecent,
        select: (data) => data.data.data,
        // staleTime:8000,
        // retry:6,
        // refetchInterval:3000,
        // refetchIntervalInBackground:true,
      });
        
    //   if (isLoading) {
    //     return (
    //       <div className="py-8 w-full flex justify-center">
    //         <ClimbingBoxLoader color="green" />
    //       </div>
    //     );
    //   }
    //   if (isError) {
    //     return (
    //       <div className="py-8 w-full flex justify-center">
    //         <h3>{error}</h3>
    //       </div>
    //     );
    //   }
    


  return (    
    responseObject
  )
}
