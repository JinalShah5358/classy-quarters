import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingapi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingapi,
    onSuccess: () => {
      toast.success("Cabin deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteBooking };
};
