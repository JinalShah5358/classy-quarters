import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingapi } from "../../services/apiSettings";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingapi,
    onSuccess: () => {
      toast.success("settings edited successfully");
      queryClient.invalidateQueries({ querykey: ["settings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUpdating, updateSettings };
};
