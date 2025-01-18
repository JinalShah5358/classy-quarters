import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export const useGetSettings = () => {
  console.log("useGetSettings");
  const { isLoadin, data: settigsData } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoadin, settigsData };
};
