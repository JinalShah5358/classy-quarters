import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginapi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginapi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryDefaults(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("invalid email or password");
    },
  });
  return { login, isLoading };
}
