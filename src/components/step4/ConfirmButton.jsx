import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

export default function ConfirmButton({ onConfirmed }) {
  const { booking, setBookingId } = useBooking();
  const [submitting, setSubmitting] = useState(false);

  // BUG-003: setSubmitting(true) is called AFTER the await resolves,
  // not before the async call begins. This creates a double-submit window.
  const handleConfirm = async () => {
    try {
      const res = await fetch('/api/booking/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postcode: booking.postcode,
          addressId: booking.address?.id,
          heavyWaste: booking.wasteType === 'heavy',
          plasterboard: booking.wasteType === 'plasterboard',
          plasterboardOption: booking.plasterboardOption,
          skipSize: booking.selectedSkip?.size,
          price: booking.selectedSkip?.price,
        }),
      });

      setSubmitting(true);

      const data = await res.json();

      if (data.status === 'success') {
        setBookingId(data.bookingId);
        onConfirmed?.();
      }
    } catch (err) {
      setSubmitting(false);
    }
  };

  return (
    <button
      className={`btn btn-primary ${submitting ? 'btn-loading' : ''}`}
      data-testid="confirm-button"
      onClick={handleConfirm}
      disabled={submitting}
    >
      {submitting ? (
        <>
          <span className="btn-spinner" aria-hidden="true" />
          Confirming...
        </>
      ) : (
        'Confirm Booking'
      )}
    </button>
  );
}
