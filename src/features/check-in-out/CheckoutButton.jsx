import Button from "../../ui/Button";
import { useCheckouthook } from "./useCheckouthook";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckouthook();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
