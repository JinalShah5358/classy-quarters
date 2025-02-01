import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export const useGetSettings = () => {
  const { isLoadin, data: settigsData } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoadin, settigsData };
};
