import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useGetSettings } from "../settings/useGetSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);

  const moveBack = useMoveBack();
  const { booking, isLoading } = useGetBooking();
  const { checkIn, isCheckingIn } = useCheckIn();
  const { settigsData, isLoading: isLoadingSettings } = useGetSettings();

  useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
  } = booking;

  const optionalBreakfastPrice =
    settigsData.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmedPaid) return;

    if (addBreakFast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmedPaid(false);
            }}
            disabled={hasBreakfast}
            id="breakfast"
          >
            want to add breakfast for{" "}
            <b>{formatCurrency(optionalBreakfastPrice)}</b>?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
          disabled={confirmedPaid || isCheckingIn}
          id="confirm"
        >
          I confirmed that {guests.name} has paid the Total Amount of{" "}
          <b>
            {!addBreakFast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(totalPrice + optionalBreakfastPrice)} 
              (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`}
          </b>
        </Checkbox>
      </Box>
      <ButtonGroup>
        {booking.status !== "checked-in" ||
          (addBreakFast && (
            <Button
              onClick={handleCheckin}
              disabled={!confirmedPaid || isCheckingIn}
            >
              Check in booking #{bookingId}
            </Button>
          ))}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
