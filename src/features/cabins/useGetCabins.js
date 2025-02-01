import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const UseGetCabins = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  console.log(cabins);
  return { isLoading, cabins, error };
};
